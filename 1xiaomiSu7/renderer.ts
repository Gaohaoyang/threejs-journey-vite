import * as THREE from 'three'
import { sizes } from './sizes'

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')
if (canvas === null) {
  throw new Error('Cannot find the canvas element')
}

export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
