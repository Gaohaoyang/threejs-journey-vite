import GUI from 'lil-gui'
import {
  directionalLight,
  pointLight,
  ambientLight,
  turnOnSpotLights,
  turnOffSpotLights,
} from './lights'
// import { openCurtain } from './objectCurtain'
import { closeBlind1, openBlind1, liftBlind1, dropBlind1 } from './objectBlind'
import { closeBlind2, openBlind2, liftBlind2, dropBlind2 } from './objectBlind2'
import { controls } from './controls'
import { screenLift, screenDrop, toggleDropAndLift } from './objectScreen'

// Debug GUI
const gui = new GUI()
const debugObject = {
  spotLight: true,
  // openCurtain: () => {
  //   openCurtain()
  // },
  closeBlind1: () => {
    closeBlind1()
  },
  openBlind1: () => {
    openBlind1()
  },
  liftBlind1: () => {
    liftBlind1()
  },
  dropBlind1: () => {
    dropBlind1()
  },
  closeBlind2: () => {
    closeBlind2()
  },
  openBlind2: () => {
    openBlind2()
  },
  liftBlind2: () => {
    liftBlind2()
  },
  dropBlind2: () => {
    dropBlind2()
  },
  liftScreen: () => {
    screenLift()
  },
  dropScreen: () => {
    screenDrop()
  },
  toggleDropAndLift: () => {
    toggleDropAndLift()
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
// gui.add(debugObject, 'closeBlind1')
// gui.add(debugObject, 'openBlind1')
// gui.add(debugObject, 'liftBlind1')
// gui.add(debugObject, 'dropBlind1')
// gui.add(debugObject, 'closeBlind2')
// gui.add(debugObject, 'openBlind2')
// gui.add(debugObject, 'liftBlind2')
// gui.add(debugObject, 'dropBlind2')
gui.add(debugObject, 'liftScreen')
gui.add(debugObject, 'dropScreen')
gui.add(debugObject, 'toggleDropAndLift')
