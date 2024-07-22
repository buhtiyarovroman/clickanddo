import { useDispatch } from 'react-redux'
import { useCallback, useState } from 'react'
import { TUseGetFavoritesProps } from './types'
import { usePagination } from '@/features/hooks'
import { useTypedSelector } from '@/app/store'
import { getNotificationSelector } from '@/entities/Notifications/store/selectors'
import { NotificationsEntities } from '@/entities/Notifications'
import { notificationsActions } from '@/entities/Notifications/store/actions'

const LIMIT = 10
export const useGetNotifications = ({
  limit = LIMIT,
}: TUseGetFavoritesProps) => {
  const { notifications, totalCount } = useTypedSelector(
    getNotificationSelector,
  )
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const getNotificationCount = async () => {
    try {
      const { data } =
        await NotificationsEntities.NotificationsService.getNotifications({
          status: 'new',
        })

      dispatch(notificationsActions.setNotificationsTotalCount(data.totalCount))
    } catch (err) {
      console.error('useGetNotifications =>', err)
    }
  }

  const getActions = useCallback(
    async (nextSkip: number) => {
      try {
        setLoading(true)

        getNotificationCount()

        const { data } =
          await NotificationsEntities.NotificationsService.getNotifications({
            limit,
            skip: nextSkip,
            sortBy: 'createdAt',
            order: -1,
          })

        dispatch(notificationsActions.setNotificationsData(data))
      } catch (err) {
        console.error('useGetNotifications =>', err)
      } finally {
        setLoading(false)
      }
    },
    [limit],
  )

  const { ...paginationProps } = usePagination({
    getAction: getActions,
    items: notifications,
    loading,
    totalCount,
  })

  return {
    getNotificationCount,
    notifications,
    loading,
    ...paginationProps,
  }
}
