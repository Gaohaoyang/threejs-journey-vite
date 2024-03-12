import { Clock } from 'three'
import stats from '../utils/stats'
import { camera } from './camera'
import { controls } from './controls'
import { renderer } from './renderer'
import { scene } from './scene'
import { viewHelper } from './viewHelper'
import { groupConstructionBoxHelper } from './objectFloorAndWalls'

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
  const delta = clock.getDelta()

  if (viewHelper.animating) viewHelper.update(delta)

  // Render
  renderer.render(scene, camera)

  // viewHelper.update(delta)
  viewHelper.render(renderer) // Render the helper

  stats.end()
  // Call tick again on the next frame
  requestAnimationFrame(tick)
}
