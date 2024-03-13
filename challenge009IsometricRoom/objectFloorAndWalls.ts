import { Mesh, MeshStandardMaterial, Group, BoxHelper, BoxGeometry } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { SUBTRACTION, ADDITION, Brush, Evaluator } from 'three-bvh-csg'
import { objectWindow } from './objectWindow'
import { floorAndWalls, wireframe, windowFrame } from './objectConstant'

const { floorXLength, floorZLength, wallHeight, wallThickness, roundRadius, roundSegments, ny } =
  floorAndWalls

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
  floorXLength,
  wallThickness,
  floorZLength,
  roundSegments,
  roundRadius,
)
const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe,
})
const floor = new Mesh(floorGeometry, floorMaterial)
floor.position.set(floorXLength / 2, -wallThickness / 2, floorZLength / 2)
floor.receiveShadow = true
floor.castShadow = true

/**
 * Walls
 */
const wallMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe,
})
const wallNXGeometry = new RoundedBoxGeometry(
  wallThickness,
  wallHeight,
  floorZLength,
  roundSegments,
  roundRadius,
)
const wallNX = new Mesh(wallNXGeometry, wallMaterial)
wallNX.position.set(-wallThickness / 2, wallHeight / 2 - wallThickness, floorZLength / 2)
wallNX.receiveShadow = true
wallNX.castShadow = true

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

const evaluator = new Evaluator()
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

groupConstruction.add(floor)
groupConstruction.add(wallNX)
groupConstruction.add(wallNZResult)
groupConstruction.add(wallPZ)
groupConstruction.add(wallPX)
groupConstruction.add(roof)
scene.add(groupConstruction)

// groupConstructionBoxHelper
export const groupConstructionBoxHelper = new BoxHelper(groupConstruction)
groupConstructionBoxHelper.visible = false
scene.add(groupConstructionBoxHelper)
