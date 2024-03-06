import './index.css'
import { type Camera } from 'three'
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js'

export const createViewHelper = (camera: Camera, canvasDom: HTMLCanvasElement) => {
  const viewHelper = new ViewHelper(camera, canvasDom)
  const div = document.createElement('div')
  div.id = 'viewHelper'
  document.body.appendChild(div)
  div.addEventListener('pointerup', (event) => viewHelper.handleClick(event))
  return viewHelper
}
