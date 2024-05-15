import { useContext, useEffect, useState } from 'react'

import { TUseGetUserProps } from './types'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import { TUser } from '@/entities/User/models'

export const useGetUserById = ({
  id,
  disableLoader = false,
}: TUseGetUserProps) => {
  const [user, setUser] = useState<TUser | null>(null)
  const { setLoading } = useContext(LoaderContext)

  const getProject = async () => {
    try {
      !disableLoader && setLoading(true)

      console.log('GET')
      const response = await UserService.getUserById({
        id,
      })

      setUser(response.data)
      console.log('setUser')
    } catch (err) {
      console.error('useGetUserById err =>', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  return {
    user,
    getProject,
  }
}
