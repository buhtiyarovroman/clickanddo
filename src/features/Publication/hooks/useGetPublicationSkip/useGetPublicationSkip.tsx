import { useCallback, useEffect, useState } from 'react'

import { TPublication } from '@/entities/Publication/models'
import { PublicationEntities } from '@/entities/Publication'
import { TUseGetPublicationSkipProps } from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { usePagination } from '@/features/hooks'

const LIMIT = 4
export const useGetPublicationSkip = ({
  limit = LIMIT,
  type,
}: TUseGetPublicationSkipProps) => {
  const { user } = useTypedSelector(getUserSelector)
  const [publication, setPublication] = useState<TPublication[]>([])
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const owner = user?._id

  const getActions = useCallback(
    async (skip: number) => {
      try {
        if (skip === 0) {
          setRefreshLoading(true)
        } else {
          setLoading(true)
        }
        const response =
          await PublicationEntities.PublicationService.getPublication({
            limit,
            skip,
            type,
            owner,
          })

        setPublication(prev =>
          !skip ? response.data.docs : [...prev, ...response.data.docs],
        )
        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetPublicationSkip err =>', err)
      } finally {
        if (skip === 0) {
          setRefreshLoading(false)
        } else {
          setLoading(false)
        }
      }
    },
    [limit, type, user?._id],
  )

  const { ...paginationProps } = usePagination({
    getAction: getActions,
    totalCount,
    loading,
    items: publication,
  })

  return {
    publication,
    totalCount,
    getActions,
    refreshLoading,
    ...paginationProps,
  }
}
