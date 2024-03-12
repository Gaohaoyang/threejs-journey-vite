import { Mesh, MeshStandardMaterial, Group } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(400, 8, 300, 8, 2)
const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const floor = new Mesh(floorGeometry, floorMaterial)
floor.position.set(0, -4, 0)

/**
 * Walls
 */
const wallMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const leftWallGeometry = new RoundedBoxGeometry(8, 268, 300, 8, 2)
const lefWall = new Mesh(leftWallGeometry, wallMaterial)
lefWall.position.set(-204, 126, 0)

const rightWallGeometry = new RoundedBoxGeometry(400 + 8, 268, 8, 8, 2)
const rightWall = new Mesh(rightWallGeometry, wallMaterial)
rightWall.position.set(-4, 134 - 8, -150 - 4)

const groupConstruction = new Group()
groupConstruction.add(floor)
groupConstruction.add(lefWall)
groupConstruction.add(rightWall)
scene.add(groupConstruction)
