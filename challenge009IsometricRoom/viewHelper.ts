import { createViewHelper } from '../utils/ViewHelper'
import { camera } from './camera'
import { renderer } from './renderer'

// helper
export const viewHelper = createViewHelper(camera, renderer.domElement)
