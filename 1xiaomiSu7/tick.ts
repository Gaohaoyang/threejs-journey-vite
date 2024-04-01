import stats from '../utils/stats'
import { controls, camera } from './camera'
import { renderer } from './renderer'
import { scene } from './scene'

/**
 * Animate
 */
export const tick = () => {
  stats.begin()
  controls.update()

  // if (model && rotation.autoRotation) {
  //   model.rotation.y += 0.005
  // }

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}
