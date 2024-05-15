import { TResponse } from '@/app/store/types'

import { apiPrivate } from '@/features/api'
import { TGetSpecialists } from './types'

const path = '/user/user'

export class SpecialistsService {
  static async getSpecialists(
    params: TGetSpecialists['payload'],
  ): TResponse<TGetSpecialists['response']> {
    return apiPrivate.get(path, { params })
  }
}
