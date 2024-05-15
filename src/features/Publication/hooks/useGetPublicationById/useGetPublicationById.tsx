import { useCallback, useEffect, useState } from 'react'

import { TPublication } from '@/entities/Publication/models'
import { PublicationEntities } from '@/entities/Publication'
import { TUseGetPublicationByIdProps } from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const useGetPublicationById = ({ id }: TUseGetPublicationByIdProps) => {
  const { setting } = useTypedSelector(getUserSelector)

  const [publication, setPublication] = useState<TPublication>()

  const getActions = useCallback(async () => {
    try {
      if (!id) return
      const response =
        await PublicationEntities.PublicationService.getPublicationById({
          id: id,
          currency: setting.currency,
        })

      setPublication(response.data)
    } catch (err) {
      console.error('useGetPublicationById err =>', err)
    } finally {
    }
  }, [setting.currency])

  useEffect(() => {
    getActions()
  }, [])

  return {
    publication,

    getActions,
  }
}
