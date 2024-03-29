import {
  Mesh,
  Group,
  // TextureLoader,
  // SRGBColorSpace,
  MeshStandardMaterial,
  // RepeatWrapping,
  PlaneGeometry,
  // SphereGeometry,
  DoubleSide,
} from 'three'
import { floorAndWalls, wireframe } from './objectConstant'
import { scene } from './scene'

const { ny } = floorAndWalls
const group = new Group()
group.position.set(0, -ny, 0)

const groundGeometry = new PlaneGeometry(400, 400)
const groundMaterial = new MeshStandardMaterial({
  // color: 0xe8f5e9,
  // color: 0x004d40,
  color: 0xcfd8dc,
  roughness: 1,
  metalness: 0,
  wireframe,
  side: DoubleSide,
})
const ground = new Mesh(groundGeometry, groundMaterial)
ground.rotation.x = -Math.PI / 2
ground.position.set(0, -floorAndWalls.wallThickness - 0.01, 0)
ground.receiveShadow = true

// const skySphereGeometry = new SphereGeometry(200, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
// const skySphere = new Mesh(skySphereGeometry, groundMaterial)
// skySphere.position.set(0, 0, 0)
// skySphere.receiveShadow = false

// group.add(skySphere)

group.add(ground)
scene.add(group)
