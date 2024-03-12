import { AxesHelper } from 'three'
import { scene } from './scene'
import { ny, floorXLength, floorZLength } from './objectFloorAndWalls'

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(42)
axesHelper.position.set(-floorXLength / 2, -ny, -floorZLength / 2)
// axesHelper.visible = false

scene.add(axesHelper)
