import { AmbientLight } from 'three'
import { scene } from './scene'

const ambientLight = new AmbientLight('#ffffff', 2)
scene.add(ambientLight)
