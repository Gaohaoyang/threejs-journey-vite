import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { startLoading } from '../utils/LoadManagerWithProgress'
import { scene } from './scene'

const cokeLoadManager = startLoading({ title: 'coke' })
const gltfLoader = new GLTFLoader(cokeLoadManager)
gltfLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/coke/coca-colaembed.gltf',
  (model) => {
    const scale = 10
    model.scene.scale.set(scale, scale, scale)
    scene.add(model.scene)
  },
)
