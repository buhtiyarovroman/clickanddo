import { TGetCategoriesRequest } from '../../models'

export type TInitialCategoriesState = {
  categories: TGetCategoriesRequest['response']

  loading: boolean
}
