// import { PlaneGeometry, MeshStandardMaterial, DoubleSide, Mesh } from 'three'
// import { wireframe, floorAndWalls } from './objectConstant'
// import { scene } from './scene'
// import * as CANNON from 'cannon-es'
// // import { world } from './physicsWorld'

// const { floorXLength, floorZLength, ny } = floorAndWalls
// const Nx = 16
// const Ny = 16
// const mass = 1
// // const clothSize = 10
// const clothSize = floorXLength / 2
// const dist = clothSize / Nx

// // const { floorXLength, floorZLength, ny } = floorAndWalls
// // const curtainWidth = floorXLength / 2
// const curtainHeight = floorAndWalls.wallHeight - 2.6

// const curtainGeometry = new PlaneGeometry(clothSize, clothSize, Nx, Ny)
// const curtainMaterial = new MeshStandardMaterial({
//   wireframe,
//   color: 0xddeeaa,
//   // transparent: true,
//   // opacity: 0.5,
//   side: DoubleSide,
// })

// const curtain = new Mesh(curtainGeometry, curtainMaterial)
// curtain.position.set(9, -ny + curtainHeight / 2 + 2, -floorZLength / 2 + 0.5)

// curtain.castShadow = true
// curtain.receiveShadow = true

// scene.add(curtain)

// /**
//  * physics
//  */
// const shape = new CANNON.Particle()

// const particles: CANNON.Body[][] = []
// for (let i = 0; i < Nx + 1; i++) {
//   particles.push([])
//   for (let j = 0; j < Ny + 1; j++) {
//     console.log(j === Ny && i % 4 === 0)
//     const particle = new CANNON.Body({
//       mass: j === Ny && i % 4 === 0 ? 0 : mass,
//       shape,
//       position: new CANNON.Vec3((i - Nx * 0.5) * dist, (j - Ny * 0.5) * dist, 0),
//       sleepSpeedLimit: 0.3,
//       // velocity: new CANNON.Vec3(0, 0, -20),
//     })
//     particles[i].push(particle)
//     world.addBody(particle)
//   }
// }

// console.log(particles)

// const connect = (i1: number, j1: number, i2: number, j2: number) => {
//   world.addConstraint(new CANNON.DistanceConstraint(particles[i1][j1], particles[i2][j2], dist))
// }

// for (let i = 0; i < Nx + 1; i++) {
//   for (let j = 0; j < Ny + 1; j++) {
//     if (i < Nx) connect(i, j, i + 1, j)
//     if (j < Ny) connect(i, j, i, j + 1)
//   }
// }

// export const updateParticles = () => {
//   for (let i = 0; i < Nx + 1; i++) {
//     for (let j = 0; j < Ny + 1; j++) {
//       const index = j * (Nx + 1) + i

//       const positionAttribute = curtainGeometry.attributes.position

//       const position = particles[i][Ny - j].position

//       positionAttribute.setXYZ(index, position.x, position.y, position.z)

//       positionAttribute.needsUpdate = true
//     }
//   }
// }

// export const openCurtain = () => {
//   for (let i = 0; i < Nx + 1; i++) {
//     for (let j = 0; j < Ny + 1; j++) {
//       const particle = particles[i][j]
//       particle.velocity.set(0, 0, -20)
//     }
//   }
// }
