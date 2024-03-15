import GUI from 'lil-gui'
import {
  directionalLight,
  pointLight,
  ambientLight,
  turnOnSpotLights,
  turnOffSpotLights,
} from './lights'

// Debug GUI
const gui = new GUI()
const debugObject = {
  spotLight: true,
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
