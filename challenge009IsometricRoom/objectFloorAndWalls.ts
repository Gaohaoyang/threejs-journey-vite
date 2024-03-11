import { Mesh, MeshStandardMaterial } from 'three'
import { scene } from './scene'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

/**
 * Floor
 */
const floorGeometry = new RoundedBoxGeometry(400, 10, 300, 2, 3)
const floorMaterial = new MeshStandardMaterial({
  roughness: 1,
  metalness: 0,
  wireframe: false,
})
const floor = new Mesh(floorGeometry, floorMaterial)
// floor.position.set(-4, 0, 0)
scene.add(floor)
