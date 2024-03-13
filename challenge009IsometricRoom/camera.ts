import { PerspectiveCamera } from 'three'
import { sizes } from './utils'

// const scale = 220

// Base camera
// const aspectRatio = sizes.width / sizes.height
export const camera = new PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 100000)
camera.position.set(120, 30, 120)
