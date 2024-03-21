import { listenResize } from '../utils'
import { sizes } from './utils'
import { camera } from './camera'
import { renderer } from './renderer'
import { tick } from './tick'
import './lights'
import './axesHelper'
// import './objectTorusKnot'
import './objectFloorAndWalls'
import './objectSofa'
import './objectRug'
// import './objectGround'
import './objectShelf'
import './objectShelfSmall'
import './objectTable'
import './objectCurtain'
import './objectBlinds'
import './gui'

tick()

listenResize(sizes, camera, renderer)
