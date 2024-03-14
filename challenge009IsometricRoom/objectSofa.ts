import { type Mesh, Group, type MeshPhongMaterial } from 'three'
import { floorAndWalls, wireframe } from './objectConstant'
import { scene } from './scene'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { startLoading } from '../utils/LoadManagerWithProgress'

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(-floorXLength / 2, -ny, -floorZLength / 2)

const sofaLoadManager = startLoading({ title: 'Sofa' })

const loader = new OBJLoader(sofaLoadManager)
loader.load('./models/ikeaSofa.obj', (obj) => {
  const scale = 10
  obj.scale.set(scale, scale, scale)
  obj.rotation.y = -Math.PI / 2
  obj.position.set(33, 0, 15)

  const sofaMesh = obj.children[0] as Mesh
  const pillowsMesh = obj.children[1] as Mesh
  addShadow(sofaMesh)
  addShadow(pillowsMesh)

  group.add(obj)
})

const addShadow = (object: Mesh) => {
  object.castShadow = true
  object.receiveShadow = true
  ;(object.material as MeshPhongMaterial).wireframe = wireframe
}

scene.add(group)
