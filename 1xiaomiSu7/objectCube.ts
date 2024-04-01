import * as THREE from 'three'

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.3,
  metalness: 0.3,
})

export const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
