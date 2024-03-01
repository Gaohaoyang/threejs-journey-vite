import Stats from 'three/addons/libs/stats.module.js'

const stats = new Stats()
stats.dom.style.left = 'auto'
stats.dom.style.top = '10px'
stats.dom.style.left = '10px'
document.body.appendChild(stats.dom)

export default stats
