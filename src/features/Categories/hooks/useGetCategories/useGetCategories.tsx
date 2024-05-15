import { useEffect } from 'react'
import { categoriesActions, getCategorySelector } from '@/entities/Category'
import { useStorePagination } from '@/features/hooks'
import { useTypedSelector } from '@/app/store'

const LIMIT = 20
export const useGetCategories = () => {
  const {
    categories: { docs, totalCount },
    loading,
  } = useTypedSelector(getCategorySelector)

  const { setIsFirstLoad, ...lazyLoadProps } = useStorePagination({
    getAction: categoriesActions.getCategoriesRequest,
    limit: LIMIT,
    loading: loading ?? false,
    totalCount: totalCount,
    items: docs,
  })

  useEffect(() => {
    setIsFirstLoad(false)
  }, [setIsFirstLoad, docs])
  return {
    categories: docs,
    ...lazyLoadProps,
  }
}
