import type { TotalData, TrendItem } from './types/statistics.type'
import { service } from '@/service'

enum Api {
  Total = '/api/statistic/total',
  Trend = '/api/statistic/trend'
}

// 统计
export const getTotal = () => {
  return service.request<Service.Result<TotalData>>({
    url: Api.Total,
    method: 'GET'
  })
}

// 趋势
export const getTrend = () => {
  return service.request<Service.Result<TrendItem[]>>({
    url: Api.Trend,
    method: 'GET'
  })
}

export * from './types/statistics.type'
