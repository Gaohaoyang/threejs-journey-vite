import { AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 2)
const directionalLightHelper = new DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
directionalLight.position.set(0, 100, 0)
scene.add(directionalLight)
