import { TResponse } from '@/app/store/types'
import { TGetCategoryByIdRequest, TGetCategoriesRequest } from './models'
import { apiPublic } from '@/features/api'

const path = '/user/interest-category'

export class CategoryService {
  //Get Publication
  static async getCategories(
    params: TGetCategoriesRequest['payload'],
  ): TResponse<TGetCategoriesRequest['response']> {
    return apiPublic.get(`${path}`, { params })
  }

  //Get Publication by id
  static async getCategoryById({
    id,
    ...params
  }: TGetCategoryByIdRequest['payload']): TResponse<
    TGetCategoryByIdRequest['response']
  > {
    return apiPublic.get(`${path}/${id}`, { params })
  }
}
