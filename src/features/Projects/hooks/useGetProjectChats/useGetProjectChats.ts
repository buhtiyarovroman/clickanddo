import { useCallback, useState } from 'react'

import { TUseGetProjectChatsProps } from './types'
import { usePagination } from '@/features/hooks'
import { ChatEntities } from '@/entities/Chat'
import { useDispatch } from 'react-redux'
import { chatActions, getChatSelector } from '@/entities/Chat/store'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const useGetProjectChats = ({ projectId }: TUseGetProjectChatsProps) => {
  const { chatList } = useTypedSelector(getChatSelector)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const { user } = useTypedSelector(getUserSelector)

  const dispatch = useDispatch()

  const getChats = useCallback(
    async (skip: number, refresh?: boolean) => {
      try {
        !refresh && setLoading(true)
        refresh && setRefreshLoading(true)

        const { data } = await ChatEntities.ChatService.getChat({
          skip,
          limit: 10,
          members: [user?._id || ''],
          sortBy: 'lastMessageDate',
          order: -1,
          project: projectId,
        })

        setTotalCount(data.totalCount)

        if (skip === 0) dispatch(chatActions.setChatList(data.docs))

        if (skip > 0) dispatch(chatActions.setChatListMore(data.docs))

        dispatch(chatActions.getAllUnreadCountRequest({}))
      } catch (err) {
        console.error('useGetProjectChats err =>', err)
      } finally {
        !refresh && setLoading(false)
        refresh && setRefreshLoading(false)
      }
    },
    [dispatch, user?._id],
  )

  const { ...paginationProps } = usePagination({
    getAction: getChats,
    items: chatList,
    loading: loading,
    totalCount,
  })

  return {
    chatList,
    getChats,
    loading,
    setLoading,
    refreshLoading,
    setRefreshLoading,
    ...paginationProps,
  }
}
