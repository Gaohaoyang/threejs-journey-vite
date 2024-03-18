import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { MeshStandardMaterial, Group, Mesh } from 'three'
import { scene } from './scene'
import { floorAndWalls, wireframe } from './objectConstant'

// (182 - 33 * 5 - 3.7 * 2) / 4 = 2.4
const shelfWidth = 18.2
const shelfHeight = 18.2
const shelfDepth = 3.3
const shelfBorderBoardThickness = 0.37
const shelfBoardThickness = 0.24
const shelfInnerWidth = 3.3
const roundSegments = 3
const roundRadius = 0.05

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(
  -floorXLength / 2 + shelfDepth / 2,
  -ny + shelfBorderBoardThickness / 2 + 0.1,
  -floorZLength / 2 + shelfWidth / 2 + 2,
)

const shelfMaterial = new MeshStandardMaterial({
  roughness: 0.9,
  metalness: 0.4,
  color: 0xffffff,
  wireframe,
})

const boardV1 = new Mesh(
  new RoundedBoxGeometry(
    shelfDepth,
    shelfHeight,
    shelfBorderBoardThickness,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)
boardV1.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 + shelfBorderBoardThickness / 2,
)

const boardH1 = new Mesh(
  new RoundedBoxGeometry(
    shelfDepth,
    shelfBorderBoardThickness,
    shelfWidth,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)

const boardH2 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfBoardThickness, shelfWidth, roundSegments, roundRadius),
  shelfMaterial,
)
boardH2.position.set(0, shelfBorderBoardThickness + shelfInnerWidth, 0)

const boardH3 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfBoardThickness, shelfWidth, roundSegments, roundRadius),
  shelfMaterial,
)
boardH3.position.set(0, shelfBorderBoardThickness + shelfInnerWidth * 2 + shelfBoardThickness, 0)

const boardH4 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfBoardThickness, shelfWidth, roundSegments, roundRadius),
  shelfMaterial,
)
boardH4.position.set(
  0,
  shelfBorderBoardThickness + shelfInnerWidth * 3 + shelfBoardThickness * 2,
  0,
)

const boardH5 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfBoardThickness, shelfWidth, roundSegments, roundRadius),
  shelfMaterial,
)
boardH5.position.set(
  0,
  shelfBorderBoardThickness + shelfInnerWidth * 4 + shelfBoardThickness * 3,
  0,
)

const boardH6 = new Mesh(
  new RoundedBoxGeometry(
    shelfDepth,
    shelfBorderBoardThickness,
    shelfWidth,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)
boardH6.position.set(
  0,
  shelfBorderBoardThickness + shelfInnerWidth * 5 + shelfBoardThickness * 4,
  0,
)

const boardV2 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfHeight, shelfBoardThickness, roundSegments, roundRadius),
  shelfMaterial,
)
boardV2.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 + shelfBorderBoardThickness / 2 + shelfBorderBoardThickness + shelfInnerWidth,
)

const boardV3 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfHeight, shelfBoardThickness, roundSegments, roundRadius),
  shelfMaterial,
)
boardV3.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 +
    shelfBorderBoardThickness / 2 +
    shelfBorderBoardThickness +
    shelfInnerWidth * 2 +
    shelfBoardThickness,
)

const boardV4 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfHeight, shelfBoardThickness, roundSegments, roundRadius),
  shelfMaterial,
)
boardV4.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 +
    shelfBorderBoardThickness / 2 +
    shelfBorderBoardThickness +
    shelfInnerWidth * 3 +
    shelfBoardThickness * 2,
)

const boardV5 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfHeight, shelfBoardThickness, roundSegments, roundRadius),
  shelfMaterial,
)
boardV5.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 +
    shelfBorderBoardThickness / 2 +
    shelfBorderBoardThickness +
    shelfInnerWidth * 4 +
    shelfBoardThickness * 3,
)

const boardV6 = new Mesh(
  new RoundedBoxGeometry(
    shelfDepth,
    shelfHeight,
    shelfBorderBoardThickness,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)
boardV6.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 +
    shelfBorderBoardThickness / 2 +
    shelfBorderBoardThickness +
    shelfInnerWidth * 5 +
    shelfBoardThickness * 4,
)

group.add(boardH1)
group.add(boardH2)
group.add(boardH3)
group.add(boardH4)
group.add(boardH5)
group.add(boardH6)
group.add(boardV1)
group.add(boardV2)
group.add(boardV3)
group.add(boardV4)
group.add(boardV5)
group.add(boardV6)

group.children.forEach((child) => {
  child.castShadow = true
  child.receiveShadow = true
})

scene.add(group)
