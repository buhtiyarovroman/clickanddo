import { useCallback, useEffect, useState } from 'react'
import { TComment } from '@/entities/Publication/models'
import { PublicationEntities } from '@/entities/Publication'
import { TUseCommentsProps } from './types'
import { usePagination } from '@/features/hooks'
const LIMIT = 5

export const useComments = ({
  id,
  limit = LIMIT,
  replyTo,
}: TUseCommentsProps) => {
  const [comments, setComments] = useState<TComment[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const getActions = useCallback(
    async (skip: number) => {
      try {
        setLoading(true)
        const response =
          await PublicationEntities.PublicationService.getPublicationComments({
            to: id,
            limit,
            skip: skip,
            replyTo,
          })

        setComments(data =>
          skip === 0 ? response.data.docs : [...data, ...response.data.docs],
        )

        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useComments err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [id, replyTo],
  )

  const { ...renderProps } = usePagination({
    getAction: getActions,
    items: comments,
    loading,
    totalCount: totalCount,
  })

  useEffect(() => {
    setComments([])
    renderProps.getFirstPage()
  }, [id])

  return {
    loading,
    comments,
    setComments,
    setLoading,
    totalCount,
    getActions,
    ...renderProps,
  }
}
