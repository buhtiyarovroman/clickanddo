import { createAction } from '@reduxjs/toolkit'
import { sliceActions } from './reducer'
import { TGetCategoriesRequest } from '../models'
import { ActionsTypes } from './actionTypes'

export const categoriesActions = {
  ...sliceActions,
  getCategoriesRequest: createAction<TGetCategoriesRequest['payload']>(
    ActionsTypes.getCategories,
  ),
}
