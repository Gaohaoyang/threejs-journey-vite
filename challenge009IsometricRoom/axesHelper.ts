import { AxesHelper } from 'three'
import { scene } from './scene'

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(3)
axesHelper.position.set(0, -3, 0)
scene.add(axesHelper)
