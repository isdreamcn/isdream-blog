import type { Pigeonhole } from './types/pigeonhole.type'
import { service } from '@/service'

enum Api {
  Main = 'statistic/pigeonhole'
}

export const getPigeonhole = () => {
  return service.request<Service.ResultPagination<Pigeonhole[]>>({
    url: Api.Main,
    method: 'GET'
  })
}

export * from './types/pigeonhole.type'
