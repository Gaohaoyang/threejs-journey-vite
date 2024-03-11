import { PerspectiveCamera } from 'three'
import { sizes } from './utils'

// Base camera
export const camera = new PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(1.3, 3, 8)
