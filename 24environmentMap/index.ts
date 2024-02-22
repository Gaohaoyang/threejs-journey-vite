import {
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  TorusKnotGeometry,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { listenResize } from '../utils'
import stats from '../utils/stats'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')
if (canvas === null) {
  throw new Error('Cannot find the canvas element')
}

// Scene
const scene = new Scene()

/**
 * Torus Knot
 */
const torusKnot = new Mesh(new TorusKnotGeometry(1, 0.4, 100, 16), new MeshBasicMaterial())
torusKnot.position.y = 4
scene.add(torusKnot)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// const clock = new THREE.Clock()
const tick = (): void => {
  stats.begin()
  // Time
  // const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  stats.end()
  // Call tick again on the next frame
  requestAnimationFrame(tick)
}

tick()

listenResize(sizes, camera, renderer)

gui.add(controls, 'autoRotate')
