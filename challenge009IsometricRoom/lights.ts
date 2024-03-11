import { AmbientLight } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 3)
scene.add(ambientLight)
