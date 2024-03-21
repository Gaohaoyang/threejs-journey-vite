import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import {
  Group,
  MeshStandardMaterial,
  TextureLoader,
  SRGBColorSpace,
  RepeatWrapping,
  Mesh,
} from 'three'
import { floorAndWalls, wireframe, windowFrame } from './objectConstant'
import { scene } from './scene'
import { degreeToRadians } from '../utils'

const blindItemWidth = windowFrame.frameWidthInner / 2 + 0.5
const blindItemDepth = 0.8
const blindItemGap = blindItemDepth - 0.04
const blindThickness = 0.1
const blindCounts = Math.ceil(windowFrame.frameHeightInner / blindItemGap)

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(
  -floorXLength / 2 + blindItemWidth / 2 + 3.2,
  -ny + blindItemGap * blindCounts + 0.5,
  -floorZLength / 2,
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
  blind1.push(blindItem)
}

group.add(...blind1)

scene.add(group)

export const closeBlind1 = () => {
  blind1.forEach((blindItem) => {
    blindItem.rotation.set(degreeToRadians(-84), 0, 0)
    // blindItem.rotateX(degreeToRadians(-84))
  })
}
