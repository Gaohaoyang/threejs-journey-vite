import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper,
  PointLight,
  PointLightHelper,
} from 'three'
import { scene } from './scene'
import { floorAndWalls } from './objectConstant'

// ambientLight
export const ambientLight = new AmbientLight('#ffffff', 0.2)
scene.add(ambientLight)

// directionalLight
export const directionalLight = new DirectionalLight('#ffffff', 1)
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

directionalLight.shadow.normalBias = 0.1

scene.add(directionalLight)

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 10)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

const directionalLightCameraHelper = new CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
directionalLightCameraHelper.visible = false

// point light
export const pointLight = new PointLight(0xffffff, 20, 40, 1)
pointLight.position.set(floorAndWalls.wallThickness, 6, floorAndWalls.wallThickness)
pointLight.castShadow = true
pointLight.shadow.camera.near = 1
pointLight.shadow.camera.far = 30

pointLight.shadow.normalBias = 0.7

scene.add(pointLight)

const pointLightHelper = new PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)
pointLightHelper.visible = false

const pointLightCameraHelper = new CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false
