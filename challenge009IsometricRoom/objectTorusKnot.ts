import { Mesh, TorusKnotGeometry, MeshStandardMaterial } from 'three'
import { scene } from './scene'

/**
 * Torus Knot
 */
const torusKnot = new Mesh(
  new TorusKnotGeometry(1, 0.4, 100, 16),
  new MeshStandardMaterial({
    roughness: 0.4,
    metalness: 0,
    color: 0xaaaaaa,
  }),
)
torusKnot.position.set(-4, 0, 0)
scene.add(torusKnot)
