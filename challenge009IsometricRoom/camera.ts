import { PerspectiveCamera } from 'three'
import { sizes } from './utils'

// const scale = 220

// Base camera
// const aspectRatio = sizes.width / sizes.height
export const camera = new PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 100000)

// if on mobile
if (sizes.width < 768) {
  camera.position.set(200, 175, 200)
} else {
  camera.position.set(120, 100, 120)
}
