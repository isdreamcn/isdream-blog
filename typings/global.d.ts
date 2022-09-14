import { HttpStatusCode } from '@/constants'

declare global {
  declare type Nullable<T> = T | null

  namespace Service {
    declare interface Result<T = any> {
      code?: HttpStatusCode
      msg?: string
      data: T
    }
  }
}