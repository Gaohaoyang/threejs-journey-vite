import { type Camera } from 'three'
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createViewHelper = (camera: Camera, canvasDom: HTMLCanvasElement) => {
  const viewHelper = new ViewHelper(camera, canvasDom)

  const div = document.createElement('div')
  div.id = 'viewHelper'
  div.style.position = 'absolute'
  div.style.right = '18px'
  div.style.bottom = '18px'
  div.style.height = '92px'
  div.style.width = '92px'
  div.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
  div.style.borderRadius = '999px'

  document.body.appendChild(div)

  div.addEventListener('pointerup', (event) => viewHelper.handleClick(event))

  return viewHelper
}
