import { useCallback, useContext, useState } from 'react'

import { usePagination } from '../../../hooks/usePagination/usePagination'
import { UserService } from '@/entities/User/services'
import { TUseGetProjectProps } from './types'
import { TProject } from '@/entities/Projects/models'
import { LoaderContext } from '@/app/contexts/Loader'
import { TFilterProjectData } from '@/entities/User/models/getUserProject'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

const LIMIT = 10

export const useGetProjects = ({
  limit = LIMIT,
  owner,
  specialist,
  status,
  hashtag,
  projectResponses,
  location,
  maxDistance,
  interest,
  order,
  sortBy,
  relevantUntil,
  radius,
  priceTo,
  priceFrom,
  ...params
}: TUseGetProjectProps) => {
  const [projects, setProjects] = useState<TProject[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [localLoading, setLocalLoading] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const [filterData, setFilterData] = useState<TFilterProjectData>({
    max: 100,
  })

  const { setLoading } = useContext(LoaderContext)
  const { setting } = useTypedSelector(getUserSelector)

  const onClear = () => {
    setProjects([])
    setTotalCount(0)
  }

  const getProjects = useCallback(
    async (nextSkip: number, globalLoader?: boolean) => {
      try {
        if (globalLoader) {
          setLoading(true)
        } else {
          setLocalLoading(true)
        }
        if (nextSkip === 0) {
          setRefreshLoading(true)
        }

        const response = await UserService.getUserProjects({
          limit,
          skip: nextSkip,
          owner,
          specialist,
          status,
          projectResponses,
          hashtag,
          location,
          maxDistance,
          interest,
          order,
          sortBy,
          relevantUntil,
          priceTo,
          priceFrom,
          currency: setting.currency,
          createdHb: params.createdHb,
          createdLb: params.createdLb,
          relevantUntilHb: params.relevantUntilHb,
          relevantUntilLb: params.relevantUntilLb,
        })

        setProjects(prev =>
          nextSkip === 0
            ? response.data.docs
            : [...prev, ...response.data.docs],
        )

        setFilterData(response.data.filterData[0])

        setTotalCount(response.data.totalCount)
      } catch (err) {
        console.error('useGetProjects err =>', err)
      } finally {
        if (globalLoader) {
          setLoading(false)
        } else {
          setLocalLoading(false)
        }

        if (nextSkip === 0) {
          setRefreshLoading(false)
        }
      }
    },
    [
      params,
      setting?.currency,
      priceTo,
      priceFrom,
      radius,
      relevantUntil,
      limit,
      owner,
      specialist,
      status,
      projectResponses,
      hashtag,
      location,
      maxDistance,
      interest,
      order,
      sortBy,
    ],
  )

  const getProjectsOnMap = useCallback(async () => {
    try {
      const response = await UserService.getUserProjects({
        owner,
        specialist,
        hashtag,
        location,
        maxDistance,
        interest,
        limit: 1000,
      })

      setProjects(response.data.docs)
    } catch (err) {
      console.error('getProjectsOnMaps err =>', err)
    } finally {
    }
  }, [owner, specialist, hashtag, location, maxDistance, interest])

  const { ...paginationProps } = usePagination({
    getAction: getProjects,
    items: projects,
    loading: localLoading,
    totalCount,
  })

  return {
    data: projects,
    onClear,
    setData: setProjects,
    getDataOnMap: getProjectsOnMap,
    localLoading,
    refreshLoading,
    filterData,
    ...paginationProps,
  }
}
