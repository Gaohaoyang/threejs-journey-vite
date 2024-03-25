import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { Group, MeshStandardMaterial, Mesh, BoxHelper } from 'three'
import { floorAndWalls, wireframe, windowFrame } from './objectConstant'
import { scene } from './scene'
import { degreeToRadians } from '../utils'

const blindItemWidth = windowFrame.frameWidthInner / 2 + 0.1
const blindItemDepth = 0.8
const blindItemGap = blindItemDepth - 0.04
const blindThickness = 0.03
const blindCounts = Math.ceil(windowFrame.frameHeightInner / blindItemGap)

const { floorXLength, floorZLength, ny } = floorAndWalls
export const group = new Group()
group.position.set(
  -floorXLength / 2 + blindItemWidth + blindItemWidth / 2 + 3.6,
  -ny + blindItemGap * blindCounts + 0.5,
  -floorZLength / 2 - 0.3,
)

const blindItemGeometry = new RoundedBoxGeometry(
  blindItemWidth,
  blindThickness,
  blindItemDepth,
  2,
  0.4,
)
const blindMaterial = new MeshStandardMaterial({
  wireframe,
  roughness: 0.6,
  metalness: 0.8,
})

const blind1: Mesh[] = []

for (let i = 0; i < blindCounts; i++) {
  const blindItem = new Mesh(blindItemGeometry, blindMaterial)
  blindItem.position.set(0, -i * blindItemGap, 0)
  blindItem.receiveShadow = true
  blindItem.castShadow = true
  blindItem.rotation.set(degreeToRadians(15), 0, 0)
  blindItem.name = 'blind2'
  blind1.push(blindItem)
}

group.add(...blind1)

scene.add(group)

// groupConstructionBoxHelper
export const groupConstructionBoxHelper = new BoxHelper(group)
groupConstructionBoxHelper.visible = false
scene.add(groupConstructionBoxHelper)

const rotationSpeed = 1
const moveSpeed = 0.15
let isClosingBlind1 = false
let isOpeningBlind1 = false
let isLiftingBlind1 = false
let isDroppingBlind1 = false

let openStatus = true
let dropStatus = true

export const toggleOpenCloseBlind2 = () => {
  if (dropStatus) {
    if (openStatus) {
      closeBlind2()
      openStatus = false
    } else {
      openBlind2()
      openStatus = true
    }
  }
}

export const toggleLiftDropBlind2 = () => {
  if (dropStatus) {
    liftBlind2()
    dropStatus = false
  } else {
    dropBlind2()
    dropStatus = true
  }
}

export const closeBlind2 = () => {
  isClosingBlind1 = true
  isOpeningBlind1 = false
  isLiftingBlind1 = false
  isDroppingBlind1 = false
}
export const openBlind2 = () => {
  isOpeningBlind1 = true
  isClosingBlind1 = false
  isLiftingBlind1 = false
  isDroppingBlind1 = false
}
export const liftBlind2 = () => {
  isLiftingBlind1 = true
  isClosingBlind1 = false
  isOpeningBlind1 = false
  isDroppingBlind1 = false
}
export const dropBlind2 = () => {
  isDroppingBlind1 = true
  isClosingBlind1 = false
  isOpeningBlind1 = false
  isLiftingBlind1 = false
}

export const blindAnimation2 = (delta: number) => {
  // console.log(blind1[blind1.length - 1].position.y) // -21.28
  if (isClosingBlind1) {
    if (blind1[0].rotation.x > degreeToRadians(-88)) {
      blind1.forEach((blindItem) => {
        blindItem.rotation.x -= delta * rotationSpeed
      })
    } else {
      isClosingBlind1 = false
    }
  } else if (isOpeningBlind1) {
    if (blind1[0].rotation.x < degreeToRadians(15)) {
      blind1.forEach((blindItem) => {
        blindItem.rotation.x += delta * rotationSpeed
      })
    } else {
      isOpeningBlind1 = false
    }
  } else if (isLiftingBlind1) {
    if (blind1[0].rotation.x > degreeToRadians(2)) {
      blind1.forEach((blindItem) => {
        blindItem.rotation.x -= delta * rotationSpeed
      })
    } else if (blind1[0].rotation.x < degreeToRadians(-2)) {
      blind1.forEach((blindItem) => {
        blindItem.rotation.x += delta * rotationSpeed
      })
    } else {
      if (blind1[blind1.length - 1].position.y < -1) {
        blind1.forEach((blindItem, index) => {
          blindItem.position.y += delta * moveSpeed * index
        })
      } else {
        console.log('lifted')
        isLiftingBlind1 = false
      }
    }
  } else if (isDroppingBlind1) {
    if (blind1[blind1.length - 1].position.y > -21.27) {
      blind1.forEach((blindItem, index) => {
        blindItem.position.y -= delta * moveSpeed * index
      })
    } else {
      console.log('dropped')
      isDroppingBlind1 = false
    }
  }
}
