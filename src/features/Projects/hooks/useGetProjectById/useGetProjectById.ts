import { useCallback, useEffect, useState } from 'react'

import { TUseGetProjectProps } from './types'
import { TProject } from '@/entities/Projects/models'
import { ProjectsService } from '@/entities/Projects/services'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const useGetProjectById = ({ id }: TUseGetProjectProps) => {
  const [project, setProject] = useState<TProject | null>(null)
  const { setting } = useTypedSelector(getUserSelector)

  const getProject = useCallback(async () => {
    try {
      // setLoading(true)
      const response = await ProjectsService.getProjectById({
        id,
        currency: setting.currency,
      })

      setProject(response.data)
    } catch (err) {
      console.error('useGetProjectById err =>', err)
    } finally {
      // setLoading(false)
    }
  }, [id])

  const onChangeStatus = async (newStatus: EProjectTypes, id?: string) => {
    if (!id) {
      console.error('no have project id')
      return
    }

    try {
      await ProjectsService.patchProjectStatus({
        id,
        status: `${newStatus}`,
      })
    } catch (err) {
      console.log('ProjectOnMarkDone err =>', err)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  return {
    project,
    getProject,
    setProject,
    onChangeStatus,
  }
}
