import type { LinkType } from './types/links.type'
import { service } from '@/service'

enum APi {
  Main = 'link_type/main'
}

export const getLinks = () => {
  return service.request<Service.Result<LinkType[]>>({
    url: APi.Main,
    method: 'GET'
  })
}

export * from './types/links.type'
