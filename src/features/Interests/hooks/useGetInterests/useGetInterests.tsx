import { useCallback, useState } from 'react'

import { usePagination } from '@/features/hooks'
import { TInterest } from '@/entities/Interests/models/common'
import { InterestsService } from '@/entities/Interests/services'
import { TUseGetInterestsProps } from './types'

const LIMIT = 15

export const useGetInterests = ({
  category,
  limit = LIMIT,
}: TUseGetInterestsProps) => {
  const [interests, setInterests] = useState<TInterest[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const getInterests = useCallback(
    async (nextSkip: number) => {
      try {
        setLoading(true)
        const response = await InterestsService.getInterestsByCategory({
          category: [category],
          skip: nextSkip,
          limit,
        })

        setInterests(prev =>
          nextSkip === 0
            ? response.data.docs
            : [...prev, ...response.data.docs],
        )
        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetInterests err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [category, limit],
  )

  const { ...paginationProps } = usePagination({
    getAction: getInterests,
    items: interests,
    loading,
    totalCount,
  })
  return {
    interests,
    setInterests,
    loading,
    ...paginationProps,
  }
}
