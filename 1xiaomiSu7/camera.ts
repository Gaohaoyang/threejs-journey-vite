import * as THREE from 'three'
import { sizes } from './sizes'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { renderer } from './renderer'

// Base camera
// const aspectRatio = sizes.width / sizes.height
export const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.01, 800)

// if on mobile
if (sizes.width < 768) {
  camera.position.set(20, 17, 20)
} else {
  camera.position.set(12, 10, 12)
}

// Controls
export const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
