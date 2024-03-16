import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { camera } from './camera'
import { renderer } from './renderer'

// Controls
export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.minDistance = 30
controls.maxDistance = 500
// controls.autoRotate = true
