import { Mesh, MeshStandardMaterial, Group } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { SUBTRACTION, Brush, Evaluator } from 'three-bvh-csg'

const transparentMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
  transparent: true,
  opacity: 0,
})

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(40.0, 0.8, 30.0, 8, 0.1)
const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const floor = new Mesh(floorGeometry, floorMaterial)
floor.position.set(0, -0.4, 0)
floor.receiveShadow = true
floor.castShadow = true

/**
 * Walls
 */
const wallMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const leftWallGeometry = new RoundedBoxGeometry(0.8, 26.8, 30.0, 8, 0.2)
const lefWall = new Mesh(leftWallGeometry, wallMaterial)
lefWall.position.set(-20.4, 12.6, 0)
lefWall.receiveShadow = true
lefWall.castShadow = true

const rightWallGeometry = new RoundedBoxGeometry(40.0 + 0.8, 26.8, 0.8, 8, 0.2)
const rightWall = new Brush(rightWallGeometry, wallMaterial)
rightWall.position.set(-0.4, 13.4 - 0.8, -15.0 - 0.4)
rightWall.updateMatrixWorld()

const windowOnRightWallGeometry = new RoundedBoxGeometry(40.0 + 0.8 - 10, 26.8 - 10, 0.8, 8, 0.2)
const windowOnRightWall = new Brush(windowOnRightWallGeometry, wallMaterial)
windowOnRightWall.position.set(-0.4, 13.4 - 0.8, -15.0 - 0.4)
windowOnRightWall.updateMatrixWorld()

const evaluator = new Evaluator()
const windowOnRightWallCSG = evaluator.evaluate(rightWall, windowOnRightWall, SUBTRACTION)
windowOnRightWallCSG.receiveShadow = true
windowOnRightWallCSG.castShadow = true

const frontWallGeometry = new RoundedBoxGeometry(40.0 + 0.8, 26.8, 0.8, 8, 0.2)
const frontWall = new Mesh(frontWallGeometry, transparentMaterial)
frontWall.position.set(-0.4, 13.4 - 0.8, 15.0 + 0.4)
frontWall.receiveShadow = true
frontWall.castShadow = true

const backWallGeometry = new RoundedBoxGeometry(0.8, 26.8, 30.0 + 0.8, 8, 0.2)
const backWall = new Mesh(backWallGeometry, transparentMaterial)
backWall.position.set(20.4, 12.6, -0.4)
backWall.receiveShadow = true
backWall.castShadow = true

/**
 * Roof
 */
const roofGeometry = new RoundedBoxGeometry(40.0 + 0.8, 0.8, 30.0 + 0.8, 8, 0.2)

const roof = new Mesh(roofGeometry, transparentMaterial)
roof.position.set(-0.4, 26.8 - 0.4, -0.4)
roof.receiveShadow = true
roof.castShadow = true

// groupConstruction
const groupConstruction = new Group()

groupConstruction.add(floor)
groupConstruction.add(lefWall)
groupConstruction.add(windowOnRightWallCSG)
groupConstruction.add(frontWall)
groupConstruction.add(backWall)
groupConstruction.add(roof)
scene.add(groupConstruction)
