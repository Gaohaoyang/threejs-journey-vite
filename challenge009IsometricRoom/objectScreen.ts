import { MeshStandardMaterial, Mesh, BoxGeometry, Group } from 'three'
import { scene } from './scene'

const screenWidth = 16 * 1.8
const screenHeight = 10 * 1.8
const screenThickness = 0.02
const screenItemNum = 80
const screenItemHeight = screenHeight / screenItemNum

const screenItemGeometry = new BoxGeometry(screenWidth, screenItemHeight, screenThickness)
const screenItemMaterial = new MeshStandardMaterial({
  metalness: 0.01,
  roughness: 0.8,
  color: 0xffffff,
  wireframe: false,
})
const screenItem = new Mesh(screenItemGeometry, screenItemMaterial)

const screenGroup = new Group()
const screenItems: Mesh[] = []

for (let i = 0; i < screenItemNum; i++) {
  const item = screenItem.clone()
  item.position.set(-16, screenHeight / 2 - screenItemHeight * i - 2, 0)
  item.rotateY(Math.PI / 2)
  screenItems.push(item)
  item.castShadow = true
  item.receiveShadow = true
}
screenGroup.add(...screenItems)

const moveSpeed = 0.1
let isLifting = false
let isDropping = false
let dropStatus = true
export const screenLift = () => {
  isLifting = true
  isDropping = false
}
export const screenDrop = () => {
  isDropping = true
  isLifting = false
}
export const screenAnimation = (delta: number) => {
  if (isLifting) {
    if (screenItems[screenItems.length - 1].position.y < screenHeight / 2 - 2) {
      screenItems.forEach((item, index) => {
        item.position.y += delta * moveSpeed * index
      })
    }
  } else if (isDropping) {
    if (screenItems[screenItems.length - 1].position.y > -screenHeight / 2 - 2 + 0.5) {
      screenItems.forEach((item, index) => {
        item.position.y -= delta * moveSpeed * index
      })
    }
  }
}

export const toggleDropAndLift = () => {
  if (dropStatus) {
    screenLift()
    dropStatus = false
  } else {
    screenDrop()
    dropStatus = true
  }
}

scene.add(screenGroup)
