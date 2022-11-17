import { withInstall } from '@/utils'
import Img from './src/img.vue'
import ImgDefault from './src/imgDefault.vue'

export const MImg = withInstall(Img)
export const MImgDefault = withInstall(ImgDefault)

export default MImg

export * from './src/img'
