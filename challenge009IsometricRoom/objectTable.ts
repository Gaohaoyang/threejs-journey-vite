import { Group, MeshStandardMaterial, type Mesh } from 'three'
import { scene } from './scene'
import { floorAndWalls, wireframe } from './objectConstant'
import { startLoading } from '../utils/LoadManagerWithProgress'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import {
  // shelfColorTexture,
  shelfNormalTexture,
  shelfAmbientOcclusionTexture,
  shelfRoughnessTexture,
  shelfMetalnessTexture,
  shelfDisplacementTexture,
  windowNormalTexture,
  windowAmbientOcclusionTexture,
  windowRoughnessTexture,
  windowMetalnessTexture,
  // displacementMap,
} from './textures'

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(-floorXLength / 2, -ny, -floorZLength / 2)

const tableLoadManager = startLoading({ title: 'Table' })

const tableLoader = new OBJLoader(tableLoadManager)

const tableBoardMaterial = new MeshStandardMaterial({
  wireframe,
  color: 0xffffff,
  // map: shelfColorTexture,
  normalMap: shelfNormalTexture,
  // normalScale: new Vector2(1, 1),
  aoMap: shelfAmbientOcclusionTexture,
  roughnessMap: shelfRoughnessTexture,
  metalnessMap: shelfMetalnessTexture,
  displacementMap: shelfDisplacementTexture,
  displacementScale: 0.002,
})

const tableLegMaterial = new MeshStandardMaterial({
  wireframe,
  color: 0xffffff,
  // map: windowNormalTexture,
  normalMap: windowNormalTexture,
  aoMap: windowAmbientOcclusionTexture,
  roughnessMap: windowRoughnessTexture,
  metalnessMap: windowMetalnessTexture,
  // displacementMap,
  // displacementScale: 0.002,
})

tableLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/table/ikea Kvistbro storage.obj',
  (obj) => {
    const scale = 10
    obj.scale.set(scale + 2, scale, scale + 2)
    obj.position.set(22, 0, 15)
    // traverse(obj)
    ;(obj.children[73] as Mesh).material = tableBoardMaterial
    ;(obj.children[72] as Mesh).material = tableBoardMaterial
    ;(obj.children[73] as Mesh).castShadow = true
    ;(obj.children[73] as Mesh).receiveShadow = true
    ;(obj.children[72] as Mesh).castShadow = true
    ;(obj.children[72] as Mesh).receiveShadow = true

    // 71 - 0
    for (let i = 0; i < 72; i++) {
      const child = obj.children[i] as Mesh
      child.castShadow = true
      child.receiveShadow = true
      child.material = tableLegMaterial
    }

    group.add(obj)
    scene.add(group)
  },
)

// const traverse = (object: Group<Object3DEventMap>) => {
//   object.traverse((child) => {
//     if ((child as Mesh).isMesh) {
//       const childMesh = child as Mesh
//       console.log(childMesh)
//       childMesh.material = tableBoardMaterial
//     }
//   })
// }
