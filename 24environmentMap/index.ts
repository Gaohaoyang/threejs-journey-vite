import {
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  // MeshPhongMaterial,
  TorusKnotGeometry,
  // AmbientLight,
  // DirectionalLight,
  Clock,
  AxesHelper,
  CubeTextureLoader,
  MeshStandardMaterial,
  EquirectangularReflectionMapping,
  // Material,
} from 'three'
import GUI from 'lil-gui'
import { listenResize } from '../utils'
import stats from '../utils/stats'
import { createViewHelper } from '../utils/ViewHelper'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'
import { repoName } from '../utils/constants'
import { startLoading } from '../utils/LoadManagerWithProgress'
import { RGBELoader } from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = {
  envMapIntensity: 1,
}

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
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      (child as Mesh).isMesh &&
      ((child as Mesh).material as MeshStandardMaterial).isMeshStandardMaterial
    ) {
      const childMaterial = (child as Mesh).material as MeshStandardMaterial
      childMaterial.envMapIntensity = debugObject.envMapIntensity
    }
  })
}

/**
 * LoadingManager
 */
const environmentMapManager = startLoading({ title: 'environment map' })
const gltfLoaderManager = startLoading({
  title: 'gltf',
})
const ktx2LoaderManager = startLoading({ title: 'ktx2' })

/**
 * Environment Map
 */
// const cubeTextureLoader = new CubeTextureLoader(environmentMapManager)
// LDR cube texture
// const symmetricalGarden = [
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/px.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/nx.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/py.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/ny.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/pz.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/nz.png',
// ]
// const cobbleStoneStreetNight = [
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/px.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/nx.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/py.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/ny.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/pz.png',
//   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/nz.png',
// ]
// const environmentMap = cubeTextureLoader.load(symmetricalGarden)
// const environmentMap = cubeTextureLoader.load(cobbleStoneStreetNight)
// scene.environment = environmentMap
// scene.background = environmentMap

// HDR
const rgbeLoader = new RGBELoader(environmentMapManager)
rgbeLoader.load(
  // 'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/symmetricalGarden/symmetrical_garden_02_2k.hdr',
  // 'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/cobblestone_street_night_2k.hdr',
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/madeWithBlender/blenderThreeLight.hdr',
  (environmentMap) => {
    // console.log('environmentMap', environmentMap)
    environmentMap.mapping = EquirectangularReflectionMapping
    scene.environment = environmentMap
    // scene.background = environmentMap
  },
)
// console.log('res', res)

// environmentMap.mapping = EquirectangularReflectionMapping

scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1

/**
 * Load Model
 */
const ktx2Loader = new KTX2Loader(ktx2LoaderManager)
  .setTranscoderPath(`${repoName}/jsm_libs_basis/`)
  .detectSupport(renderer)
const gltfLoader = new GLTFLoader(gltfLoaderManager)
gltfLoader.setKTX2Loader(ktx2Loader)
gltfLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/FlightHelmet/glTF-KTX-BasisU/FlightHelmet.gltf',
  (gltf) => {
    gltf.scene.scale.set(10, 10, 10)
    gltf.scene.position.set(0, -3, 0)
    scene.add(gltf.scene)
    updateAllMaterials()
  },
)

/**
 * Torus Knot
 */
const torusKnot = new Mesh(
  new TorusKnotGeometry(1, 0.4, 100, 16),
  new MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: 0xaaaaaa,
    // envMap: environmentMap,
  }),
)
torusKnot.position.set(-4, 0, 0)
// torusKnot.position.y = 4
scene.add(torusKnot)

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(1.3, 3, 8)

/**
 * Light
 */
// scene.add(new AmbientLight(0x444444))
// light
// const light = new DirectionalLight(0xffffff, 1)
// light.position.set(20, 20, 0)
// scene.add(light)

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(5)
axesHelper.position.set(0, -3, 0)
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
const guiEnvironment = gui.addFolder('Environment')

guiEnvironment.add(scene, 'backgroundBlurriness').min(0).max(0.2).step(0.001)
guiEnvironment.add(scene, 'backgroundIntensity').min(0).max(5).step(0.001)
guiEnvironment
  .add(debugObject, 'envMapIntensity')
  .min(0)
  .max(10)
  .step(0.001)
  .onChange(updateAllMaterials)
