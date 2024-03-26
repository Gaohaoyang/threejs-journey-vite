import { Clock } from 'three'
import stats from '../utils/stats'
import { camera } from './camera'
import { controls } from './controls'
import { renderer } from './renderer'
import { scene } from './scene'
import { viewHelper } from './viewHelper'
import { groupConstructionBoxHelper } from './objectFloorAndWalls'
// import { world } from './physicsWorld'
// import { updateParticles } from './objectCurtain'
import { blindAnimation } from './objectBlind'
import { blindAnimation2 } from './objectBlind2'
import { setFromCamera, intersectObjects } from './raycaster'
import { screenAnimation } from './objectScreen'

// clock
const clock = new Clock()

/**
 * Animate
 */
export const tick = () => {
  stats.begin()
  renderer.clear()

  groupConstructionBoxHelper.update()

  // Update controls
  controls.update()

  // updateParticles()
  // world.fixedStep()
  // cannonDebugger.update()

  const delta = clock.getDelta()

  if (viewHelper.animating) viewHelper.update(delta)
  blindAnimation(delta)
  blindAnimation2(delta)
  screenAnimation(delta)

  setFromCamera()
  intersectObjects()

  // Render
  renderer.render(scene, camera)

  // viewHelper.update(delta)
  viewHelper.render(renderer) // Render the helper

  stats.end()
  // Call tick again on the next frame
  requestAnimationFrame(tick)
}
