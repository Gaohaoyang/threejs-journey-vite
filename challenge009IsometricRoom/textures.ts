import { RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three'
import { startLoading } from '../utils/LoadManagerWithProgress'

// texture
const shelfTextureLoadManager = startLoading({ title: 'Shelf Texture' })
const shelfTextureLoader = new TextureLoader(shelfTextureLoadManager)
export const shelfColorTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_COL_1K_METALNESS.png',
)
shelfColorTexture.colorSpace = SRGBColorSpace
export const shelfNormalTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_NRM_1K_METALNESS.png',
)
export const shelfAmbientOcclusionTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_AO_1K_METALNESS.png',
)
export const shelfRoughnessTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_ROUGHNESS_1K_METALNESS.png',
)
export const shelfMetalnessTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_METALNESS_1K_METALNESS.png',
)
export const shelfDisplacementTexture = shelfTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/wood/VeneerWhiteOakRandomMatched001_DISP_1K_METALNESS.png',
)
shelfColorTexture.wrapS =
  shelfColorTexture.wrapT =
  shelfNormalTexture.wrapS =
  shelfNormalTexture.wrapT =
  shelfAmbientOcclusionTexture.wrapS =
  shelfAmbientOcclusionTexture.wrapT =
  shelfRoughnessTexture.wrapS =
  shelfRoughnessTexture.wrapT =
  shelfMetalnessTexture.wrapS =
  shelfMetalnessTexture.wrapT =
  shelfDisplacementTexture.wrapS =
  shelfDisplacementTexture.wrapT =
    RepeatWrapping

const repeat = 0.3
shelfColorTexture.repeat.set(repeat, repeat)
shelfNormalTexture.repeat.set(repeat, repeat)
shelfAmbientOcclusionTexture.repeat.set(repeat, repeat)
shelfRoughnessTexture.repeat.set(repeat, repeat)
shelfMetalnessTexture.repeat.set(repeat, repeat)
shelfDisplacementTexture.repeat.set(repeat, repeat)

// texture
const windowTextureLoadManager = startLoading({ title: 'Window texture' })

const windowTextureLoader = new TextureLoader(windowTextureLoadManager)

export const windowColorTexture = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-albedo.png',
)
windowColorTexture.colorSpace = SRGBColorSpace
export const windowNormalTexture = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-Normal-dx.png',
)
export const windowAmbientOcclusionTexture = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-ao.png',
)
export const windowRoughnessTexture = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-Roughness.png',
)
export const windowMetalnessTexture = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-Metallic.png',
)
export const displacementMap = windowTextureLoader.load(
  'https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/texture/metal/worn-shiny-metal-Height.png',
)

windowColorTexture.wrapS = RepeatWrapping
windowColorTexture.wrapT = RepeatWrapping
windowNormalTexture.wrapS = RepeatWrapping
windowNormalTexture.wrapT = RepeatWrapping
windowAmbientOcclusionTexture.wrapS = RepeatWrapping
windowAmbientOcclusionTexture.wrapT = RepeatWrapping
windowRoughnessTexture.wrapS = RepeatWrapping
windowRoughnessTexture.wrapT = RepeatWrapping
windowMetalnessTexture.wrapS = RepeatWrapping
windowMetalnessTexture.wrapT = RepeatWrapping
displacementMap.wrapS = RepeatWrapping
displacementMap.wrapT = RepeatWrapping
