import { useCallback, useState } from 'react'

import { TUseGetUserReviewsProps } from './types'
import { UserService } from '@/entities/User/services'
import { TReview } from '@/entities/User/models'
import { usePagination } from '@/features/hooks'

const LIMIT = 10

export const useGetUserReviews = ({
  id,
  limit = LIMIT,
}: TUseGetUserReviewsProps) => {
  const [reviews, setReviews] = useState<TReview[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const getReviews = useCallback(
    async (newSkip: number) => {
      if (!id) {
        console.error('no have user id for review')
        return
      }

      try {
        setLoading(true)

        const { data } = await UserService.getUserReviews({
          to: id,
          limit,
          skip: newSkip,
        })

        setReviews(prev =>
          newSkip === 0 ? data.docs : [...prev, ...data.docs],
        )
        setTotalCount(data.totalCount)
      } catch (err) {
        console.error('useGetUserReviews err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [id, setLoading, limit],
  )

  const { ...paginationProps } = usePagination({
    getAction: getReviews,
    items: reviews,
    loading: loading,
    totalCount,
  })

  return {
    reviews,
    getReviews,
    totalCount,
    ...paginationProps,
  }
}
