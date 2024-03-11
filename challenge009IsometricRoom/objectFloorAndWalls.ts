import { Mesh, MeshStandardMaterial } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(400, 8, 300, 4, 2)
const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const floor = new Mesh(floorGeometry, floorMaterial)
floor.position.set(0, -4, 0)
scene.add(floor)
