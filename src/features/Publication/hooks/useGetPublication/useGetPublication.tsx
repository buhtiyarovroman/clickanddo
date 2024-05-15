import { useCallback, useEffect, useState } from 'react'

import { TPublication } from '@/entities/Publication/models'
import { PublicationEntities } from '@/entities/Publication'
import { TUseGetPublicationProps } from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

const LIMIT = 4
export const useGetPublication = ({
  limit = LIMIT,
  type,
  ownerId,
}: TUseGetPublicationProps) => {
  const { user, setting } = useTypedSelector(getUserSelector)
  const [publication, setPublication] = useState<TPublication[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const owner = ownerId ? ownerId : user?._id
  const getActions = useCallback(
    async (nextPage: number) => {
      try {
        const response =
          await PublicationEntities.PublicationService.getPublication({
            limit,
            page: nextPage,
            type: [type],
            owner,
            currency: setting.currency,
          })

        setPublication(response.data.docs)
        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetPublication err =>', err)
      } finally {
      }
    },
    [limit, type, user?._id],
  )

  useEffect(() => {
    getActions(page)
  }, [getActions, page])

  return {
    publication,
    totalCount,
    page,
    setPage,
    getActions,
  }
}
