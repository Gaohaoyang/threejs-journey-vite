import GUI from 'lil-gui'
import {
  directionalLight,
  pointLight,
  ambientLight,
  turnOnSpotLights,
  turnOffSpotLights,
} from './lights'
import { openCurtain } from './objectCurtain'
import { closeBlind1 } from './objectBlinds'
import { controls } from './controls'

// Debug GUI
const gui = new GUI()
const debugObject = {
  spotLight: true,
  openCurtain: () => {
    openCurtain()
  },
  closeBlind1: () => {
    closeBlind1()
  },
}

export { gui, debugObject }

gui.add(directionalLight, 'visible').name('directionalLight')
gui.add(pointLight, 'visible').name('pointLight')
gui.add(ambientLight, 'visible').name('ambientLight')
gui
  .add(debugObject, 'spotLight')
  .name('spotLight')
  .onChange((value: boolean) => {
    if (value) {
      turnOnSpotLights()
    } else {
      turnOffSpotLights()
    }
  })
gui.add(controls, 'autoRotate')
// gui.add(debugObject, 'openCurtain')
gui.add(debugObject, 'closeBlind1')
