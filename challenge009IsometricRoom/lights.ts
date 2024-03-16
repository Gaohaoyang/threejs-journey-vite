import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
} from 'three'
import { scene } from './scene'
import { floorAndWalls } from './objectConstant'

// ambientLight
export const ambientLight = new AmbientLight('#ffffff', 0.2)
scene.add(ambientLight)

// directionalLight
export const directionalLight = new DirectionalLight('#ffffff', 2)
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
export const pointLight = new PointLight(0xffffff, 30, 40, 1)
pointLight.position.set(floorAndWalls.wallThickness, 2, floorAndWalls.wallThickness)
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

// spot light
const spotLight = new SpotLight(0xffffff, 30, 60, Math.PI * 0.1, 0.6, 1)
spotLight.position.set(floorAndWalls.floorXLength / 2 - 3, 6, -6)
spotLight.target.position.set(floorAndWalls.floorXLength / 2 - 3, -floorAndWalls.ny, -6)
spotLight.castShadow = true
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 30
scene.add(spotLight)

const spotLightHelper = new SpotLightHelper(spotLight, 0xffff00)
scene.add(spotLightHelper)
spotLightHelper.visible = false

const spotLightCameraHelper = new CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
spotLightCameraHelper.visible = false

// spot light2
const spotLight2 = new SpotLight(0xffffff, 30, 60, Math.PI * 0.1, 0.6, 1)
spotLight2.position.set(floorAndWalls.floorXLength / 2 - 3, 6, 6)
spotLight2.target.position.set(floorAndWalls.floorXLength / 2 - 3, -floorAndWalls.ny, 6)
spotLight2.castShadow = true
spotLight2.shadow.camera.near = 1
spotLight2.shadow.camera.far = 30
scene.add(spotLight2)

const spotLightHelper2 = new SpotLightHelper(spotLight2, 0xffff00)
scene.add(spotLightHelper2)
spotLightHelper2.visible = false

const spotLightCameraHelper2 = new CameraHelper(spotLight2.shadow.camera)
scene.add(spotLightCameraHelper2)
spotLightCameraHelper2.visible = false

// spot light3
const spotLight3 = new SpotLight(0xffffff, 30, 60, Math.PI * 0.1, 0.6, 1.5)
spotLight3.position.set(-(floorAndWalls.floorXLength / 2 - 1), 6.8, 6)
spotLight3.target.position.set(-(floorAndWalls.floorXLength / 2), -floorAndWalls.ny, 6)
spotLight3.castShadow = true
spotLight3.shadow.camera.near = 1
spotLight3.shadow.camera.far = 30
scene.add(spotLight3)

const spotLightHelper3 = new SpotLightHelper(spotLight3, 0xffff00)
scene.add(spotLightHelper3)
spotLightHelper3.visible = false

const spotLightCameraHelper3 = new CameraHelper(spotLight3.shadow.camera)
scene.add(spotLightCameraHelper3)
spotLightCameraHelper3.visible = false

// spot light4
const spotLight4 = new SpotLight(0xffffff, 30, 60, Math.PI * 0.1, 0.6, 1.5)
spotLight4.position.set(-(floorAndWalls.floorXLength / 2 - 1), 6.8, -6)
spotLight4.target.position.set(-(floorAndWalls.floorXLength / 2), -floorAndWalls.ny, -6)
spotLight4.castShadow = true
spotLight4.shadow.camera.near = 1
spotLight4.shadow.camera.far = 30
scene.add(spotLight4)

const spotLightHelper4 = new SpotLightHelper(spotLight4, 0xffff00)
scene.add(spotLightHelper4)
spotLightHelper4.visible = false

const spotLightCameraHelper4 = new CameraHelper(spotLight4.shadow.camera)
scene.add(spotLightCameraHelper4)
spotLightCameraHelper4.visible = false

const spotLights = [spotLight, spotLight2, spotLight3, spotLight4]

export const turnOffSpotLights = () => {
  spotLights.forEach((spotLight) => {
    spotLight.visible = false
  })
}

export const turnOnSpotLights = () => {
  spotLights.forEach((spotLight) => {
    spotLight.visible = true
  })
}
