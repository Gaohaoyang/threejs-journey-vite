import * as THREE from 'three'

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

export const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, -1)
