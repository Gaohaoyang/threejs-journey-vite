import {
  Mesh,
  MeshStandardMaterial,
  Group,
  BoxHelper,
  BoxGeometry,
  TextureLoader,
  RepeatWrapping,
} from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { SUBTRACTION, ADDITION, Brush, Evaluator } from 'three-bvh-csg'
import { objectWindow } from './objectWindow'
import { floorAndWalls, wireframe, windowFrame } from './objectConstant'
import { startLoading } from '../utils/LoadManagerWithProgress'

const { floorXLength, floorZLength, wallHeight, wallThickness, roundRadius, roundSegments, ny } =
  floorAndWalls

const evaluator = new Evaluator()

// wall texture
const windowTextureLoadManager = startLoading({ title: 'Wall texture' })
const wallTextureLoader = new TextureLoader(windowTextureLoadManager)
const wallColorTexture = wallTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wall/fiber-textured-wall1_albedo.png',
)
const wallNormalTexture = wallTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wall/fiber-textured-wall1_normal-ogl.png',
)
const wallAmbientOcclusionTexture = wallTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wall/fiber-textured-wall1_ao.png',
)
wallColorTexture.repeat.set(2, 2)
wallNormalTexture.repeat.set(2, 2)
wallAmbientOcclusionTexture.repeat.set(2, 2)
wallColorTexture.wrapS = wallColorTexture.wrapT = RepeatWrapping
wallNormalTexture.wrapS = wallNormalTexture.wrapT = RepeatWrapping
wallAmbientOcclusionTexture.wrapS = wallAmbientOcclusionTexture.wrapT = RepeatWrapping

const wallMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe,
})
wallMaterial.map = wallColorTexture
wallMaterial.normalMap = wallNormalTexture
wallMaterial.aoMap = wallAmbientOcclusionTexture

const transparentMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe,
  transparent: true,
  opacity: 0,
})

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(
  floorXLength + 1,
  wallThickness,
  floorZLength + 1,
  roundSegments,
  roundRadius,
)

// floor texture
const floorTextureLoadManager = startLoading({ title: 'Floor texture' })
const floorTextureLoader = new TextureLoader(floorTextureLoadManager)

const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe,
})
let floor = new Brush(floorGeometry, floorMaterial)
floor.position.set(floorXLength / 2 - 1 / 2, -wallThickness / 2, floorZLength / 2 - 1 / 2)
floor.updateMatrixWorld()

// floor brick

const floorBrickGeometry = new RoundedBoxGeometry(
  floorXLength + 1,
  0.4,
  floorZLength + 1,
  roundSegments,
  roundRadius,
)
const floorBrickColorTexture = floorTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/floor/Proma-XL-Mist-001-DIFFUSE-1K.png')
const floorBrickNormalTexture = floorTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/floor/Proma-XL-Mist-001-NORMALS16_OPENGL-1K.png',
)
const floorBrickDisplacementTexture = floorTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/floor/Proma-XL-Mist-001-DISPLACEMENT16-1K.png',
)
const floorBrickRoughnessTexture = floorTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/floor/Proma-XL-Mist-001-ROUGHNESS-1K.png',
)
floorBrickColorTexture.wrapS =
  floorBrickColorTexture.wrapT =
  floorBrickNormalTexture.wrapS =
  floorBrickNormalTexture.wrapT =
  floorBrickDisplacementTexture.wrapS =
  floorBrickDisplacementTexture.wrapT =
  floorBrickRoughnessTexture.wrapS =
  floorBrickRoughnessTexture.wrapT =
    RepeatWrapping
floorBrickColorTexture.rotation =
  floorBrickNormalTexture.rotation =
  floorBrickDisplacementTexture.rotation =
  floorBrickRoughnessTexture.rotation =
    Math.PI / 2
floorBrickColorTexture.repeat.set(1.3, 1.3)
floorBrickNormalTexture.repeat.set(1.3, 1.3)
floorBrickDisplacementTexture.repeat.set(1.3, 1.3)
floorBrickRoughnessTexture.repeat.set(1.3, 1.3)

const floorBrickMaterial = new MeshStandardMaterial({
  // roughness: 1,
  // metalness: 0,
  wireframe,
  map: floorBrickColorTexture,
  normalMap: floorBrickNormalTexture,
  displacementMap: floorBrickDisplacementTexture,
  displacementScale: 0.01,
  roughnessMap: floorBrickRoughnessTexture,
  // color: 0x000000,
})
const floorBrick = new Brush(floorBrickGeometry, floorBrickMaterial)
floorBrick.position.set(floorXLength / 2 - 1 / 2, -0.199, floorZLength / 2 - 1 / 2)
floorBrick.updateMatrixWorld()

floor = evaluator.evaluate(floorBrick, floor, ADDITION)

/**
 * Walls
 */
const wallNXGeometry = new RoundedBoxGeometry(
  wallThickness,
  wallHeight,
  floorZLength + 1,
  roundSegments,
  roundRadius,
)
const wallNX = new Brush(wallNXGeometry, wallMaterial)
wallNX.position.set(-wallThickness / 2, wallHeight / 2 - wallThickness, floorZLength / 2 - 1 / 2)
wallNX.updateMatrixWorld()
// wallNX.receiveShadow = true
// wallNX.castShadow = true

const wallNZGeometry = new RoundedBoxGeometry(
  floorXLength + wallThickness,
  wallHeight,
  wallThickness,
  roundSegments,
  roundRadius,
)
const wallNZ = new Brush(wallNZGeometry, wallMaterial)
wallNZ.position.set(
  floorXLength / 2 - wallThickness / 2,
  wallHeight / 2 - wallThickness,
  -wallThickness / 2,
)
wallNZ.updateMatrixWorld()

const windowOnWallNZGeometry = new BoxGeometry(
  windowFrame.frameWidthOuter,
  windowFrame.frameHeightOuter,
  wallThickness,
)
const windowOnWallNZ = new Brush(windowOnWallNZGeometry, wallMaterial)
windowOnWallNZ.position.set(
  windowFrame.frameWidthOuter / 2 + windowFrame.x,
  windowFrame.frameHeightOuter / 2 + windowFrame.y,
  -wallThickness / 2,
)
windowOnWallNZ.updateMatrixWorld()

const windowOnWallNZCSG = evaluator.evaluate(wallNZ, windowOnWallNZ, SUBTRACTION)
windowOnWallNZCSG.updateMatrixWorld()
const wallNZResult = evaluator.evaluate(windowOnWallNZCSG, objectWindow, ADDITION)
wallNZResult.receiveShadow = true
wallNZResult.castShadow = true
wallNZResult.updateMatrixWorld()

const wallPZGeometry = new RoundedBoxGeometry(
  floorXLength + wallThickness + wallThickness,
  wallHeight,
  wallThickness,
  roundSegments,
  roundRadius,
)
const wallPZ = new Mesh(wallPZGeometry, transparentMaterial)
wallPZ.position.set(
  floorXLength / 2,
  wallHeight / 2 - wallThickness,
  floorZLength + wallThickness / 2,
)
wallPZ.receiveShadow = true
wallPZ.castShadow = true

const wallPXGeometry = new RoundedBoxGeometry(
  wallThickness,
  wallHeight,
  floorZLength + wallThickness,
  roundSegments,
  roundRadius,
)
const wallPX = new Mesh(wallPXGeometry, transparentMaterial)
wallPX.position.set(
  floorXLength + wallThickness / 2,
  wallHeight / 2 - wallThickness,
  floorZLength / 2 - wallThickness / 2,
)
wallPX.receiveShadow = true
wallPX.castShadow = true

/**
 * Roof
 */
const roofGeometry = new RoundedBoxGeometry(
  floorXLength + wallThickness + wallThickness,
  wallThickness,
  floorZLength + wallThickness + wallThickness,
  roundSegments,
  roundRadius,
)

const roof = new Mesh(roofGeometry, transparentMaterial)
roof.position.set(floorXLength / 2, wallHeight - wallThickness / 2, floorZLength / 2)
roof.receiveShadow = true
roof.castShadow = true

// groupConstruction
const groupConstruction = new Group()
groupConstruction.position.set(-floorXLength / 2, -ny, -floorZLength / 2)

let threeWallsResult = evaluator.evaluate(wallNX, wallNZResult, ADDITION)
threeWallsResult.updateMatrixWorld()
threeWallsResult = evaluator.evaluate(threeWallsResult, floor, ADDITION)

threeWallsResult.castShadow = true
threeWallsResult.receiveShadow = true

groupConstruction.add(threeWallsResult)
groupConstruction.add(wallPZ)
groupConstruction.add(wallPX)
groupConstruction.add(roof)
scene.add(groupConstruction)

// groupConstructionBoxHelper
export const groupConstructionBoxHelper = new BoxHelper(groupConstruction)
groupConstructionBoxHelper.visible = false
scene.add(groupConstructionBoxHelper)
