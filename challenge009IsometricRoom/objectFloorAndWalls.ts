import { Mesh, MeshStandardMaterial, Group } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(40.0, 0.8, 30.0, 8, 0.2)
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
const rightWall = new Mesh(rightWallGeometry, wallMaterial)
rightWall.position.set(-0.4, 13.4 - 0.8, -15.0 - 0.4)
rightWall.receiveShadow = true
rightWall.castShadow = true

const groupConstruction = new Group()

groupConstruction.add(floor)
groupConstruction.add(lefWall)
groupConstruction.add(rightWall)
scene.add(groupConstruction)
