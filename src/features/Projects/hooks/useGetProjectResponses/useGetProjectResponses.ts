import { useCallback, useEffect, useState } from 'react'

import { TUseGetProjectProps } from './types'
import { TProjectResponse } from '@/entities/Projects/models'
import { ProjectsService } from '@/entities/Projects/services'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const useGetProjectResponses = ({ id }: TUseGetProjectProps) => {
  const [responses, setResponses] = useState<TProjectResponse[]>([])
  const [loading, setLoading] = useState(false)
  const { setting } = useTypedSelector(getUserSelector)

  const getResponses = useCallback(async () => {
    try {
      setLoading(true)

      console.log('get Responses')
      const response = await ProjectsService.getProjectResponses({
        id,
        currency: setting.currency,
      })

      setResponses(response.data)
    } catch (err) {
      console.error('useGetProjectById err =>', err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getResponses()
  }, [])

  return {
    responses,
    getResponses,
    setResponses,
    loading,
  }
}
