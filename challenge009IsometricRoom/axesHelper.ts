import { AxesHelper } from 'three'
import { scene } from './scene'

/**
 * AxesHelper
 */
const axesHelper = new AxesHelper(200)
axesHelper.position.set(0, 0, 0)
scene.add(axesHelper)
