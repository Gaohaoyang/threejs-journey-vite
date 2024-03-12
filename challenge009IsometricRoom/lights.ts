import { AmbientLight, DirectionalLight, DirectionalLightHelper, CameraHelper } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 1)
directionalLight.position.set(20, 20, -30)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 100
directionalLight.shadow.camera.top = 50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.bottom = -50
directionalLight.shadow.camera.left = -50

directionalLight.shadow.normalBias = 0.12

scene.add(directionalLight)

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 10)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false
