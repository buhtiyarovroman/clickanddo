import { useCallback, useEffect, useState } from 'react'
import { TUseGetPublicationProps } from './types'
import { TListFilterData, TPublication } from '@/entities/Publication/models'
import {
  getPublicationSelector,
  PublicationEntities,
} from '@/entities/Publication'
import { usePagination } from '@/features/hooks'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

const LIMIT = 4
export const useGetPublicationWithPagination = ({
  limit = LIMIT,
  type,
  hashtag,
}: TUseGetPublicationProps) => {
  const [publication, setPublication] = useState<TPublication[]>([])
  const [filterData, setFilterData] = useState<TListFilterData>({})
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const { setting } = useTypedSelector(getUserSelector)

  const { listFilters } = useTypedSelector(getPublicationSelector)

  const getActions = useCallback(
    async (nextSkip: number) => {
      const params =
        listFilters.longitude && listFilters.latitude
          ? {
              location: [listFilters.longitude, listFilters.latitude],
            }
          : {}
      try {
        setLoading(true)

        // console.log('params =>', {
        //   limit,
        //   skip: nextSkip,
        //   type: listFilters.type,
        //   maxDistance: 20000,
        //   radius: listFilters.radius,
        //   currency: setting.currency,
        //   priceHb: listFilters.max,
        //   priceLb: listFilters.min,
        //   hashtag,
        //   ...params,
        // })

        const response =
          await PublicationEntities.PublicationService.getPublication({
            limit,
            skip: nextSkip,
            type: listFilters.type,
            maxDistance: 20000,
            radius: listFilters.radius,
            currency: setting.currency,
            priceHb: listFilters.max,
            priceLb: listFilters.min,
            hashtag,
            ...params,
          })

        setPublication(prev =>
          nextSkip === 0
            ? response.data.docs
            : [...prev, ...response.data.docs],
        )

        setFilterData(response.data.filterData[0])

        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetPublicationWithPagination err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [limit, type, listFilters, setting.currency, hashtag],
  )

  useEffect(() => {
    getActions(0)
  }, [listFilters, setting.currency])

  const { ...paginationProps } = usePagination({
    getAction: getActions,
    items: publication,
    loading: loading,
    totalCount,
  })

  return {
    publication,
    totalCount,
    page,
    setPage,
    loading,
    filterData,
    ...paginationProps,
  }
}
