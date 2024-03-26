import { MeshStandardMaterial, DoubleSide, Mesh, BoxGeometry, Group } from 'three'
import { wireframe, floorAndWalls } from './objectConstant'
import { scene } from './scene'
import * as CANNON from 'cannon-es'
import { world } from './physicsWorld'

const screenWidth = 20
const screenHeight = 18
const screenThickness = 0.02
const screenItemNum = 100
const screenItemHeight = screenHeight / screenItemNum

const screenItemGeometry = new BoxGeometry(screenWidth, screenItemHeight, screenThickness)
const screenItemMaterial = new MeshStandardMaterial({
  color: 0xffffff,
  side: DoubleSide,
  wireframe: false,
})
const screenItem = new Mesh(screenItemGeometry, screenItemMaterial)

const screenGroup = new Group()

for (let i = 0; i < screenItemNum; i++) {
  const item = screenItem.clone()
  item.position.set(-16, screenHeight / 2 - screenItemHeight * i - 3, 0)
  item.rotateY(Math.PI / 2)
  screenGroup.add(item)
}

scene.add(screenGroup)
