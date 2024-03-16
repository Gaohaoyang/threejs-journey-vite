import {
  type Mesh,
  Group,
  TextureLoader,
  SRGBColorSpace,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three'
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
        wireframe,
      })
      sofaMesh.material = sofaMaterial

      const pillowsMaterial = new MeshStandardMaterial({
        map: pillowColorTexture,
        normalMap: pillowNormalTexture,
        aoMap: pillowAmbientOcclusionTexture,
        color: 0x4db6ac,
        wireframe,
      })
      pillowsMesh.material = pillowsMaterial

      group.add(obj)
    },
  })

  const sofaTextureLoader = new TextureLoader(sofaTextureLoadManager)
  const sofaColorTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabric/Fabric030_1K-JPG_Color.jpg',
  )
  sofaColorTexture.colorSpace = SRGBColorSpace
  sofaColorTexture.wrapS = RepeatWrapping
  sofaColorTexture.wrapT = RepeatWrapping
  const sofaNormalTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabric/Fabric030_1K-JPG_NormalGL.jpg',
  )
  sofaNormalTexture.wrapS = RepeatWrapping
  sofaNormalTexture.wrapT = RepeatWrapping
  const sofaAmbientOcclusionTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabric/Fabric030_1K-JPG_AmbientOcclusion.jpg',
  )
  sofaAmbientOcclusionTexture.wrapS = RepeatWrapping
  sofaAmbientOcclusionTexture.wrapT = RepeatWrapping
  const sofaRoughnessTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabric/Fabric030_1K-JPG_Roughness.jpg',
  )
  sofaRoughnessTexture.wrapS = RepeatWrapping
  sofaRoughnessTexture.wrapT = RepeatWrapping

  const pillowColorTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabricLinen/fabric-029_linen-plain-100x100cm_b.png',
  )
  // const pillowColorTexture = sofaTextureLoader.load(
  //   'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabricLinen/fabric-029_linen-plain-100x100cm-dark-gray_d.jpg',
  // )
  pillowColorTexture.colorSpace = SRGBColorSpace
  pillowColorTexture.wrapS = RepeatWrapping
  pillowColorTexture.wrapT = RepeatWrapping
  const pillowNormalTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabricLinen/fabric-029_linen-plain-100x100cm_n.png',
  )
  pillowNormalTexture.wrapS = RepeatWrapping
  pillowNormalTexture.wrapT = RepeatWrapping

  const pillowAmbientOcclusionTexture = sofaTextureLoader.load(
    'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/fabricLinen/fabric-029_linen-plain-100x100cm_o.png',
  )
  pillowAmbientOcclusionTexture.wrapS = RepeatWrapping
  pillowAmbientOcclusionTexture.wrapT = RepeatWrapping
})

const addShadow = (object: Mesh) => {
  object.castShadow = true
  object.receiveShadow = true
}

scene.add(group)
