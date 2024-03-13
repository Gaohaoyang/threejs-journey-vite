import GUI from 'lil-gui'
import { directionalLight, pointLight } from './lights'

// Debug GUI
const gui = new GUI()
const debugObject = {}

export { gui, debugObject }

gui.add(directionalLight, 'visible').name('directionalLight')

gui.add(pointLight, 'visible').name('pointLight')
