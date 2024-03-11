import { OrthographicCamera } from 'three'
import { sizes } from './utils'

const scale = 220

// Base camera
const aspectRatio = sizes.width / sizes.height
export const camera = new OrthographicCamera(
  -1 * aspectRatio * scale,
  1 * aspectRatio * scale,
  scale,
  -scale,
  1,
  1000,
)
camera.position.set(200, 100, 200)
