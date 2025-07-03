import * as THREE from 'three'
import GUI from 'lil-gui'
import { listenResize } from '../utils'
import stats from '../utils/stats'
import { createViewHelper } from '../utils/ViewHelper'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Debug
const gui = new GUI()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('.webgl')
if (!canvas) {
  throw new Error('Canvas not found')
}

// Scene
const scene = new THREE.Scene()

// Object
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x607d8b,
//   }),
// )
// scene.add(cube)

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// Material
const material = new THREE.MeshBasicMaterial({
  color: 0x607d8b,
  side: THREE.DoubleSide,
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.set(0, 0, 2)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false

// helper
const viewHelper = createViewHelper(camera, renderer.domElement)

// clock
const clock = new THREE.Clock()

/**
 * Animate
 */
const tick = () => {
  stats.begin()
  renderer.clear()

  // Update controls
  controls.update()
  const delta = clock.getDelta()

  if (viewHelper.animating) viewHelper.update(delta)

  // Render
  renderer.render(scene, camera)

  // viewHelper.update(delta)
  viewHelper.render(renderer) // Render the helper

  stats.end()
  // Call tick again on the next frame
  requestAnimationFrame(tick)
}

tick()

listenResize(sizes, camera, renderer)

gui.add(controls, 'autoRotate')
