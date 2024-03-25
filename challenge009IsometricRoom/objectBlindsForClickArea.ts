import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { scene } from './scene'
import { blindItemWidth, blindItemDepth } from './objectBlind'
import { windowFrame, floorAndWalls } from './objectConstant'

const { floorXLength, floorZLength, ny } = floorAndWalls

export const windowBlind1Area = new Mesh(
  new BoxGeometry(blindItemWidth, windowFrame.frameHeightInner / 2 + 4, blindItemDepth),
  new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0, wireframe: true }),
)

windowBlind1Area.position.set(
  -floorXLength / 2 + blindItemWidth / 2 + 3.5,
  -ny + 8 + 0.5,
  -floorZLength / 2 - 0.3,
)
windowBlind1Area.name = 'windowBlind1Area'

scene.add(windowBlind1Area)

export const windowBlind2Area = new Mesh(
  new BoxGeometry(blindItemWidth,windowFrame.frameHeightInner / 2 + 4, blindItemDepth),
  new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0, wireframe: true }),
)

windowBlind2Area.position.set(
  -floorXLength / 2 + blindItemWidth / 2 + 3.6 + blindItemWidth,
  -ny + 8 + 0.5,
  -floorZLength / 2 - 0.3,
)
windowBlind2Area.name = 'windowBlind2Area'

scene.add(windowBlind2Area)
