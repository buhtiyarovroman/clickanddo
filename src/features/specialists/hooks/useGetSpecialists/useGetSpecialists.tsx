import { useCallback, useState } from 'react'

import { usePagination } from '@/features/hooks'
import { SpecialistsService } from '@/entities/Specialist/services'
import { TUseGetSpecialistProps } from './types'
import { TUser } from '@/entities/User/models'

const LIMIT = 15

export const useGetSpecialists = ({
  interest,
  hashtag,
  limit = LIMIT,
  location,
  maxDistance,
  login,
}: TUseGetSpecialistProps) => {
  const [specialists, setSpecialists] = useState<TUser[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const getSpecialists = useCallback(
    async (nextSkip: number) => {
      try {
        setLoading(true)

        const response = await SpecialistsService.getSpecialists({
          interest,
          hashtag,
          role: 'specialist',
          skip: nextSkip,
          limit,
          location,
          maxDistance,
          login,
        })

        setSpecialists(
          nextSkip === 0
            ? response.data.docs
            : [...specialists, ...response.data.docs],
        )
        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetSpecialists err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [interest, hashtag, limit, location, maxDistance, specialists, login],
  )

  const getSpecialistsOnMap = useCallback(async () => {
    try {
      const response = await SpecialistsService.getSpecialists({
        interest,
        hashtag,
        role: 'specialist',
        location,
        maxDistance,
        limit: 1000,
      })

      setSpecialists(response.data.docs)
    } catch (err) {
      console.error('useGetSpecialists onMap err =>', err)
    } finally {
    }
  }, [interest, hashtag, location, maxDistance])

  const { ...paginationProps } = usePagination({
    getAction: getSpecialists,
    items: specialists,
    loading,
    totalCount,
  })
  return {
    data: specialists,
    setData: setSpecialists,
    getDataOnMap: getSpecialistsOnMap,
    ...paginationProps,
  }
}
