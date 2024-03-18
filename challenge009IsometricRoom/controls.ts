import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { camera } from './camera'
import { renderer } from './renderer'

// Controls
export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// controls.autoRotate = true
controls.minDistance = 30
controls.maxDistance = 400
controls.maxPolarAngle = Math.PI / 1.98
