import { AmbientLight, DirectionalLight, DirectionalLightHelper, CameraHelper } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 3)
directionalLight.position.set(10, 20, -30)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 60
directionalLight.shadow.camera.top = 33
directionalLight.shadow.camera.right = 33
directionalLight.shadow.camera.bottom = -33
directionalLight.shadow.camera.left = -33

scene.add(directionalLight)

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 10)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false
