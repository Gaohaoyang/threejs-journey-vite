import {
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  MeshPhongMaterial,
  TorusKnotGeometry,
  AmbientLight,
  DirectionalLight,
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
const torusKnot = new Mesh(
  new TorusKnotGeometry(1, 0.4, 100, 16),
  new MeshPhongMaterial({
    color: 0x00ffff,
    flatShading: true,
    transparent: true,
  }),
)
// torusKnot.position.y = 4
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
camera.position.set(5, 5, 5)
scene.add(camera)

/**
 * Light
 */
scene.add(new AmbientLight(0x444444))
// light
const light = new DirectionalLight(0xffffff, 1)
light.position.set(20, 20, 0)
scene.add(light)

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.y = 3.5
controls.enableDamping = true

// helper
const viewHelper = new ViewHelper(camera, renderer.domElement)
// viewHelper.controls = controls
// viewHelper.controls.center = controls.target

const div = document.createElement('div')
div.id = 'viewHelper'
div.style.position = 'absolute'
div.style.right = '0'
div.style.bottom = '0'
div.style.height = '128px'
div.style.width = '128px'

document.body.appendChild(div)

div.addEventListener('pointerup', (event) => viewHelper.handleClick(event))

// clock
const clock = new Clock()

/**
 * Animate
 */
const tick = (): void => {
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
