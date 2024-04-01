import { cube } from './objectCube'
import { renderer } from './renderer'
import { camera } from './camera'
import { listenResize } from '../utils'
import { sizes } from './sizes'
import { ambientLight, directionalLight } from './lights'
import { scene } from './scene'
import { tick } from './tick'

scene.add(cube)
scene.add(ambientLight)
scene.add(directionalLight)

renderer.render(scene, camera)

tick()

listenResize(sizes, camera, renderer)
