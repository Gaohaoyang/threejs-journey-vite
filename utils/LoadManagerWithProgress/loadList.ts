interface LoadItem {
  name: string
  status: 'init' | 'loading' | 'loaded' | 'error'
}

const loadList: LoadItem[] = []

export const initLoadItem = (name: string) => {
  loadList.push({ name, status: 'init' })
}

export const startLoadItem = (name: string) => {
  const item = loadList.find((item) => item.name === name)
  if (item) {
    item.status = 'loading'
  }
}

export const loadedLoadItem = (name: string) => {
  const item = loadList.find((item) => item.name === name)
  if (item) {
    item.status = 'loaded'
  }
}

export const errorLoadItem = (name: string) => {
  const item = loadList.find((item) => item.name === name)
  if (item) {
    item.status = 'error'
  }
}

export const isAllLoaded = () => {
  return loadList.every((item) => item.status === 'loaded')
}

export default loadList
