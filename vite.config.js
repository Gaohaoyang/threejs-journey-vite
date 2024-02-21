import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'
import { html as formatHtml } from 'js-beautify'

const repoName = '/threejs-journey-vite'

// 获取所有的入口
const entryPoints = fs.readdirSync(__dirname).reduce((entries, dir) => {
  const fullDir = resolve(__dirname, dir)
  const entry = resolve(fullDir, 'index.html')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    entries[dir] = entry
  }
  return entries
}, {})

// 生成目录链接
const links = Object.keys(entryPoints)
  .map((dir) => `<li><a href="${repoName}/${dir}/index.html">${dir}</a></li>`)
  .join('\n')

// 更新根目录的 index.html
const indexPath = resolve(__dirname, 'index.html')
let indexHtml = fs.readFileSync(indexPath, 'utf-8')
indexHtml = indexHtml.replace(/<ul>[\s\S]*?<\/ul>/, `<ul>${links}</ul>`)
fs.writeFileSync(indexPath, formatHtml(indexHtml))

export default defineConfig({
  base: repoName,
  build: {
    rollupOptions: {
      input: {
        main: indexPath,
        ...entryPoints,
      },
    },
  },
})
