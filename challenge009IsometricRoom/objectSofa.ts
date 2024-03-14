import { type Mesh, Group, TextureLoader, SRGBColorSpace, MeshStandardMaterial, RepeatWrapping } from 'three'
import { floorAndWalls, wireframe } from './objectConstant'
import { scene } from './scene'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { startLoading } from '../utils/LoadManagerWithProgress'

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(-floorXLength / 2, -ny, -floorZLength / 2)

const sofaLoadManager = startLoading({ title: 'Sofa' })

const loader = new OBJLoader(sofaLoadManager)
loader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/sofa/ikeaSofa.obj', (obj) => {
  const scale = 10
  obj.scale.set(scale, scale, scale)
  obj.rotation.y = -Math.PI / 2
  obj.position.set(33, 0, 15)

  const sofaMesh = obj.children[0] as Mesh
  const pillowsMesh = obj.children[1] as Mesh
  addShadow(sofaMesh)
  addShadow(pillowsMesh)

  const sofaTextureLoadManager = startLoading({
    title: 'Sofa texture',
    onLoad: () => {
      const sofaMaterial = new MeshStandardMaterial({
        map: sofaColorTexture,
        normalMap: sofaNormalTexture,
        aoMap: sofaAmbientOcclusionTexture,
        roughnessMap: sofaRoughnessTexture,
      })
      sofaMesh.material = sofaMaterial
      group.add(obj)
    },
  })

  const sofaTextureLoader = new TextureLoader(sofaTextureLoadManager)
  const sofaColorTexture = sofaTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/sofa/Fabric030_1K-JPG_Color.jpg')
  sofaColorTexture.colorSpace = SRGBColorSpace
  sofaColorTexture.wrapS = RepeatWrapping
  sofaColorTexture.wrapT = RepeatWrapping
  const sofaNormalTexture = sofaTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/sofa/Fabric030_1K-JPG_NormalGL.jpg')
  const sofaAmbientOcclusionTexture = sofaTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/sofa/Fabric030_1K-JPG_AmbientOcclusion.jpg')
  const sofaRoughnessTexture = sofaTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/sofa/Fabric030_1K-JPG_Roughness.jpg')
})

const addShadow = (object: Mesh) => {
  object.castShadow = true
  object.receiveShadow = true
  ;(object.material as MeshStandardMaterial).wireframe = wireframe
}

scene.add(group)
