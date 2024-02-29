import {
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  TorusKnotGeometry,
  Clock,
} from 'three'
import { OrbitControls } from 'three-stdlib'
import GUI from 'lil-gui'
import { listenResize } from '../utils'
import stats from '../utils/stats'
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js'

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

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.y = 3.5
controls.enableDamping = true

// helper
const viewHelper = new ViewHelper(camera, renderer.domElement)


/**
 * Animate
 */
// const clock = new Clock()
const tick = (): void => {
  stats.begin()

  // Time
  // const delta = clock.getDelta()

  // Update controls
  controls.update()

  // Update helper
  // viewHelper.update(delta) // Update the helper

  // Render
  renderer.render(scene, camera)
  // viewHelper.render(renderer)

  // viewHelper.update(delta)
  // viewHelper.render(renderer) // Render the helper

  // Call tick again on the next frame
  requestAnimationFrame(tick)
  stats.end()
}

tick()

listenResize(sizes, camera, renderer)

gui.add(controls, 'autoRotate')
