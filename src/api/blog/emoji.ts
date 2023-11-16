import type { EmojiType } from './types/emoji.type'
import { service } from '@/service'

enum APi {
  Main = 'emoji_type/main'
}

export const getEmojiType = () => {
  return service.request<Service.Result<EmojiType[]>>({
    url: APi.Main,
    method: 'GET'
  })
}

export * from './types/emoji.type'
