import { MeshStandardMaterial, BoxGeometry } from 'three'
import { SUBTRACTION, Brush, Evaluator, ADDITION } from 'three-bvh-csg'
import { windowFrame, wireframe, floorAndWalls } from './objectConstant'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const {
  frameThickness,
  frameWidthOuter,
  frameHeightOuter,
  slatWidth,
  x,
  y,
  frameWidthInner,
  frameHeightInner,
} = windowFrame

const windowFrameMaterial = new MeshStandardMaterial({
  roughness: 0.5,
  metalness: 0.7,
  wireframe,
  color: 0x008866,
})

const windowOuterFrameBrush = new Brush(
  new BoxGeometry(frameWidthOuter, frameHeightOuter, frameThickness),
  windowFrameMaterial,
)
windowOuterFrameBrush.updateMatrixWorld()
const windowInnerHoleBrush = new Brush(
  new BoxGeometry(frameWidthInner, frameHeightInner, frameThickness),
  windowFrameMaterial,
)
windowInnerHoleBrush.updateMatrixWorld()

const evaluator = new Evaluator()
const frameInner = evaluator.evaluate(windowOuterFrameBrush, windowInnerHoleBrush, SUBTRACTION)

const horizontalSlatBrush = new Brush(
  new RoundedBoxGeometry(
    frameWidthInner + 1,
    slatWidth * 2,
    slatWidth * 2,
    floorAndWalls.roundSegments,
    floorAndWalls.roundRadius,
  ),
  windowFrameMaterial,
)
horizontalSlatBrush.position.set(0, -2.2, 0)
horizontalSlatBrush.updateMatrixWorld()

const verticalSlatBrush = new Brush(
  new RoundedBoxGeometry(
    0.6,
    frameHeightInner + 1,
    0.6,
    floorAndWalls.roundSegments,
    floorAndWalls.roundRadius,
  ),
  windowFrameMaterial,
)
verticalSlatBrush.position.set(0, 0, 0)
verticalSlatBrush.updateMatrixWorld()

let crossSlatBrush = evaluator.evaluate(horizontalSlatBrush, verticalSlatBrush, ADDITION)

const leftSlatBrush = new Brush(
  new RoundedBoxGeometry(
    slatWidth,
    13.4,
    slatWidth,
    floorAndWalls.roundSegments,
    floorAndWalls.roundRadius,
  ),
  windowFrameMaterial,
)
leftSlatBrush.position.set(-8.2, 4.6, 0)
leftSlatBrush.updateMatrixWorld()

crossSlatBrush = evaluator.evaluate(crossSlatBrush, leftSlatBrush, ADDITION)

const rightSlatBrush = new Brush(
  new RoundedBoxGeometry(
    slatWidth,
    13.4,
    slatWidth,
    floorAndWalls.roundSegments,
    floorAndWalls.roundRadius,
  ),
  windowFrameMaterial,
)
rightSlatBrush.position.set(8.2, 4.6, 0)
rightSlatBrush.updateMatrixWorld()

crossSlatBrush = evaluator.evaluate(crossSlatBrush, rightSlatBrush, ADDITION)

// const glassMaterial = new MeshStandardMaterial({
//   roughness: 0,
//   metalness: 1,
//   wireframe,
//   color: 0x000000,
//   transparent: true,
//   opacity: 0.2,
// })
// const glassBrush = new Brush(new BoxGeometry(frameWidthInner, frameHeightInner, 0.2), glassMaterial)
// glassBrush.position.set(0, 0, 0)
// glassBrush.castShadow = false
// glassBrush.receiveShadow = false
// glassBrush.updateMatrixWorld()

// crossSlatBrush = evaluator.evaluate(crossSlatBrush, glassBrush, ADDITION)

export const objectWindow = evaluator.evaluate(frameInner, crossSlatBrush, ADDITION)

objectWindow.position.set(
  frameWidthOuter / 2 + x,
  frameHeightOuter / 2 + y,
  -(floorAndWalls.wallThickness - frameThickness / 2),
)
objectWindow.updateMatrixWorld()
