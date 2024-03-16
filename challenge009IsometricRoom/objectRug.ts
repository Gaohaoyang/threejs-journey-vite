import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import {
  Group,
  MeshStandardMaterial,
  TextureLoader,
  SRGBColorSpace,
  RepeatWrapping,
  Mesh,
} from 'three'
import { floorAndWalls, wireframe } from './objectConstant'
import { scene } from './scene'
import { startLoading } from '../utils/LoadManagerWithProgress'

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(-floorXLength / 2, -ny, -floorZLength / 2)

const rugGeometry = new RoundedBoxGeometry(22, 0.2, 26, 2, 0.5)
const rugTextureLoadManager = startLoading({ title: 'Rug Texture' })
const rugTextureLoader = new TextureLoader(rugTextureLoadManager)
const rugColorTexture = rugTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/rug/Fabric_Rug_006_COLOR2.png')
rugColorTexture.colorSpace = SRGBColorSpace
const rugDisplacementTexture = rugTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/rug/Fabric_Rug_006_DISP.png')
const rugNormalTexture = rugTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/rug/Fabric_Rug_006_NRM.jpg')
const rugAmbientOcclusionTexture = rugTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/rug/Fabric_Rug_006_OCC.jpg')
const rugRoughnessTexture = rugTextureLoader.load('https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/rug/Fabric_Rug_006_ROUGH.jpg')

rugColorTexture.wrapS =
  rugColorTexture.wrapT =
  rugDisplacementTexture.wrapS =
  rugDisplacementTexture.wrapT =
  rugNormalTexture.wrapS =
  rugNormalTexture.wrapT =
  rugAmbientOcclusionTexture.wrapS =
  rugAmbientOcclusionTexture.wrapT =
  rugRoughnessTexture.wrapS =
  rugRoughnessTexture.wrapT =
    RepeatWrapping

const repeat = 0.44
rugColorTexture.repeat.set(repeat, repeat)
rugDisplacementTexture.repeat.set(repeat, repeat)
rugNormalTexture.repeat.set(repeat, repeat)
rugAmbientOcclusionTexture.repeat.set(repeat, repeat)
rugRoughnessTexture.repeat.set(repeat, repeat)

const rugMaterial = new MeshStandardMaterial({
  wireframe,
  map: rugColorTexture,
  displacementMap: rugDisplacementTexture,
  displacementScale: 0.005,
  normalMap: rugNormalTexture,
  aoMap: rugAmbientOcclusionTexture,
  roughnessMap: rugRoughnessTexture,
})

rugMaterial.normalScale.set(1.2, 1.2)

const rug = new Mesh(rugGeometry, rugMaterial)
rug.position.set(28, 0.01, 15)
rug.receiveShadow = true
rug.castShadow = true

group.add(rug)
scene.add(group)
