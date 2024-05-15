import { useCallback, useState } from 'react'
import { TUsePublicationResponsesProps } from './types'
import { UserService } from '@/entities/User/services'
import { TProject } from '@/entities/Projects/models'
import { usePagination } from '@/features/hooks'

export const usePublicationResponses = ({
  id,
}: TUsePublicationResponsesProps) => {
  const [responses, setResponses] = useState<TProject[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const getProjectsByPublication = useCallback(
    async (skip: number) => {
      try {
        setLoading(true)
        const response = await UserService.getUserProjects({
          origin: id,

          skip,
          limit: 10,
        })

        setResponses(prev =>
          skip === 0 ? response.data.docs : [...prev, ...response.data.docs],
        )
        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useComments err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [id],
  )

  const { ...paginationProps } = usePagination({
    getAction: getProjectsByPublication,
    items: responses,
    loading,
    totalCount,
  })

  return {
    loading,

    setLoading,
    totalCount,
    responses,
    ...paginationProps,
  }
}
