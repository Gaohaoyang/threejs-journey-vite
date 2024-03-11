import { gui } from './gui'
import { listenResize } from '../utils'
import { sizes } from './utils'
import { camera } from './camera'
import { renderer } from './renderer'
import { controls } from './controls'
import { tick } from './tick'
import './lights'
import './axesHelper'
import './objectTorusKnot'

tick()

listenResize(sizes, camera, renderer)

gui.add(controls, 'autoRotate')
