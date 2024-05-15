import { TResponse } from '@/app/store/types'
import { TGetInterestByCategory } from './models'

import { apiPrivate } from '@/features/api'

const path = '/user/interest'

export class InterestsService {
  static async getInterestsByCategory(
    params: TGetInterestByCategory['payload'],
  ): TResponse<TGetInterestByCategory['response']> {
    return apiPrivate.get(path, { params })
  }
}
