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
  AxesHelper,
} from 'three'
import GUI from 'lil-gui'
import { listenResize } from '../utils'
import stats from '../utils/stats'
import { createViewHelper } from '../utils/ViewHelper'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'

/**
 * Base
 */
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
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')
if (canvas === null) {
  throw new Error('Cannot find the canvas element')
}

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
 * Load Model
 */
const ktx2Loader = new KTX2Loader()
  .setTranscoderPath('/threejs-journey-vite/jsm_libs_basis/')
  .detectSupport(renderer)
const gltfLoader = new GLTFLoader()
gltfLoader.setKTX2Loader(ktx2Loader)
gltfLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/FlightHelmet/glTF-KTX-BasisU/FlightHelmet.gltf',
  (gltf) => {
    console.log('success')
    console.log(gltf)
  },
)

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 4, 5)

/**
 * Light
 */
scene.add(new AmbientLight(0x444444))
// light
const light = new DirectionalLight(0xffffff, 1)
light.position.set(20, 20, 0)
scene.add(light)

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(3)
scene.add(axesHelper)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// helper
const viewHelper = createViewHelper(camera, renderer.domElement)

// clock
const clock = new Clock()

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
