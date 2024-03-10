import { LoadingManager } from 'three'
import './index.css'
import { initLoadItem, startLoadItem, loadedLoadItem, errorLoadItem, isAllLoaded } from './loadList'

interface StartLoading {
  title: string
  onLoad?: () => void
}

export const startLoading = (param: StartLoading) => {
  const { title, onLoad } = param
  initLoadItem(title)

  const loadingElementWrap = getLoadingElementWrap()
  const {
    divInner: progressBarInnerEle,
    divTitlePercentage,
    divTitleEle,
  } = createProgressBar(loadingElementWrap, title)
  const manager = new LoadingManager()
  manager.onStart = (url, itemsLoaded, itemsTotal) => {
    console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
    divTitleEle.textContent = `${title} loading ...`
    startLoadItem(title)
  }
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`)
    progressBarInnerEle.style.transform = `translateX(${(itemsLoaded / itemsTotal) * 100}%)`
    divTitlePercentage.textContent = `${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%`
  }
  manager.onError = (url) => {
    console.log(`There was an error loading ${url}`)
    errorLoadItem(title)
  }
  manager.onLoad = () => {
    onLoad && onLoad()
    console.log('Loading complete!')
    console.log('success')
    divTitleEle.textContent = `${title} loading completed!`
    loadedLoadItem(title)
    if (isAllLoaded()) {
      console.log('All loaded!')
      hideLoading()
    }
  }
  return manager
}

const getLoadingElementWrap = () => {
  const loadingWrapEle = document.querySelector<HTMLDivElement>('#LoadingWrap')
  if (loadingWrapEle) {
    return loadingWrapEle
  } else {
    const div = document.createElement('div')
    div.id = 'LoadingWrap'
    document.body.appendChild(div)
    return div
  }
}

const createProgressBar = (wrap: HTMLDivElement, title: string) => {
  const divTitleAreaEle = document.createElement('div')
  divTitleAreaEle.className = 'progress-bar-title'
  wrap.appendChild(divTitleAreaEle)

  const divTitleEle = document.createElement('div')
  divTitleEle.textContent = title
  divTitleAreaEle.appendChild(divTitleEle)

  const divTitlePercentage = document.createElement('div')
  divTitlePercentage.textContent = '0%'
  divTitleAreaEle.appendChild(divTitlePercentage)

  const divWrap = document.createElement('div')
  divWrap.className = 'progress-bar'
  const divInner = document.createElement('div')
  divInner.className = 'progress-bar-inner'
  divWrap.appendChild(divInner)
  wrap.appendChild(divWrap)
  return { divInner, divTitlePercentage, divTitleEle }
}

export const hideLoading = () => {
  const loadingWrapEle = document.querySelector<HTMLDivElement>('#LoadingWrap')
  if (loadingWrapEle) {
    setTimeout(() => {
      loadingWrapEle.style.opacity = '0'
      setTimeout(() => {
        loadingWrapEle.style.display = 'none'
      }, 300)
    }, 300)
  }
}
