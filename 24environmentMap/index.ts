import * as THREE from 'three'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
