import { Raycaster, type Intersection } from 'three'
import { sizes } from './utils'
import { camera } from './camera'
import { toggleOpenCloseBlind1 } from './objectBlind'
import { toggleOpenCloseBlind2 } from './objectBlind2'
import {
  windowBlind1Area as objectBlind,
  windowBlind2Area as objectBlind2,
} from './objectBlindsForClickArea'
import { showCursorTip, hideCursorTip } from './cursorTip'

const objectsToTest = [objectBlind, objectBlind2]

/**
 * Raycaster
 */
const raycaster = new Raycaster()

/**
 * Mouse
 */
const mouse: {
  x: number | null
  y: number | null
} = { x: null, y: null }

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1
})

export let currentIntersect: Intersection | null = null

export const setFromCamera = () => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (mouse.x && mouse.y) {
    // @ts-expect-error It's OK to pass an object with x and y properties instead of a Vector2
    raycaster.setFromCamera({ x: mouse.x, y: mouse.y }, camera)
  }
}

window.addEventListener('click', (event) => {})

let deltaTime = 0
window.addEventListener('mousedown', () => {
  // console.log('first mousedown')
  deltaTime = +Date.now()
})
window.addEventListener('mouseup', (event) => {
  if (+Date.now() - deltaTime < 300) {
    console.log('mouseup click----')
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
    if (currentIntersect) {
      console.log('clicked object', currentIntersect.object.name)
      switch (currentIntersect.object.name) {
        case 'windowBlind1Area':
          console.log('clicked windowBlind1Area')
          toggleOpenCloseBlind1()
          break
        case 'windowBlind2Area':
          console.log('clicked windowBlind2Area')
          toggleOpenCloseBlind2()
          break
        // case objectBlind2:
        //   console.log('clicked objectBlind2')
        //   break
        // case object3:
        //   console.log('clicked object3')
        //   break
        default:
          break
      }
    }
  }
})

export const intersectObjects = () => {
  const intersects: Intersection[] = raycaster.intersectObjects(objectsToTest)

  if (intersects.length) {
    if (!currentIntersect || currentIntersect.object !== intersects[0].object) {
      console.log('mouse enter', intersects[0].object.name)
      document.documentElement.style.cursor = 'pointer'

      switch (intersects[0].object.name) {
        case 'windowBlind1Area':
          showCursorTip('Click here to open/close blinds 1')
          break
        case 'windowBlind2Area':
          showCursorTip('Click here to open/close blinds 2')
          break

        default:
          break
      }
    }

    ;[currentIntersect] = intersects
  } else {
    if (currentIntersect) {
      console.log('mouse leave', intersects)
      document.documentElement.style.cursor = 'auto'
      hideCursorTip()
    }

    currentIntersect = null
  }
}
