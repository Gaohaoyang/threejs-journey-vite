import { PerspectiveCamera } from 'three'
import { sizes } from './utils'

// const scale = 220

// Base camera
// const aspectRatio = sizes.width / sizes.height
export const camera = new PerspectiveCamera(20, sizes.width / sizes.height, 25, 600)

// if on mobile
if (sizes.width < 768) {
  camera.position.set(200, 175, 200)
} else {
  camera.position.set(120, 100, 120)
}
