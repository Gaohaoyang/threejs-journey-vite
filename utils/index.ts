import { type PerspectiveCamera, type WebGLRenderer } from 'three'

/**
 * listen window resize to update camera and renderer
 */
export const listenResize = (
  sizes: {
    width: number
    height: number
  },
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
}
