import { AxesHelper } from 'three'
import { scene } from './scene'

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(20)
axesHelper.position.set(0, 0, 0)
// axesHelper.visible = false

scene.add(axesHelper)
