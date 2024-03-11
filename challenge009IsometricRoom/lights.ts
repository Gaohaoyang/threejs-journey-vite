import { AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 3)
directionalLight.position.set(100, 200, -300)
scene.add(directionalLight)

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 100)
scene.add(directionalLightHelper)
