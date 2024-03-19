import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { Group, Mesh } from 'three'
import { scene } from './scene'
import { floorAndWalls } from './objectConstant'
import { shelfMeasurements, shelfMaterial } from './objectShelf'

const {
  shelfWidth: bigShelfWidth,
  shelfDepth,
  shelfBorderBoardThickness,
  shelfBoardThickness,
  shelfInnerWidth,
  roundSegments,
  roundRadius,
} = shelfMeasurements
const shelfWidth = shelfInnerWidth * 2 + shelfBoardThickness + shelfBorderBoardThickness * 2
const shelfHeight = shelfInnerWidth * 4 + shelfBoardThickness * 3 + shelfBorderBoardThickness * 2

const { floorXLength, floorZLength, ny } = floorAndWalls
const group = new Group()
group.position.set(
  -floorXLength / 2 + shelfDepth / 2,
  -ny + shelfBorderBoardThickness / 2 + 0.1,
  -floorZLength / 2 + shelfWidth / 2 + 2 + bigShelfWidth,
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
  new RoundedBoxGeometry(
    shelfDepth,
    shelfBorderBoardThickness,
    shelfWidth,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)
boardH5.position.set(
  0,
  shelfBorderBoardThickness + shelfInnerWidth * 4 + shelfBoardThickness * 3,
  0,
)

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

const boardV2 = new Mesh(
  new RoundedBoxGeometry(
    shelfDepth,
    shelfHeight,
    shelfBorderBoardThickness,
    roundSegments,
    roundRadius,
  ),
  shelfMaterial,
)
boardV2.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  shelfWidth / 2 - shelfBorderBoardThickness / 2,
)

const boardV3 = new Mesh(
  new RoundedBoxGeometry(shelfDepth, shelfHeight, shelfBoardThickness, roundSegments, roundRadius),
  shelfMaterial,
)
boardV3.position.set(
  0,
  shelfHeight / 2 - shelfBorderBoardThickness / 2,
  -shelfWidth / 2 + shelfBorderBoardThickness / 2 + shelfBorderBoardThickness + shelfInnerWidth,
)

group.add(boardH1)
group.add(boardH2)
group.add(boardH3)
group.add(boardH4)
group.add(boardH5)
group.add(boardV1)
group.add(boardV2)
group.add(boardV3)

group.children.forEach((child) => {
  child.castShadow = true
  child.receiveShadow = true
})
scene.add(group)
