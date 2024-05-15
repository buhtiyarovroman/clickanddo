import { useCallback, useState } from 'react'

import { TUseGetChatsProps } from './types'
import { usePagination } from '@/features/hooks'
import { ChatEntities } from '@/entities/Chat'
import { useDispatch } from 'react-redux'
import { chatActions, getChatSelector } from '@/entities/Chat/store'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const useGetChats = ({ project }: TUseGetChatsProps) => {
  const { chatList, projectChatList } = useTypedSelector(getChatSelector)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshLoading, setRefreshLoading] = useState(false)
  const { user } = useTypedSelector(getUserSelector)

  const currentChats = project ? projectChatList : chatList

  const dispatch = useDispatch()

  const getChats = useCallback(
    async (skip: number, refresh?: boolean) => {
      try {
        !refresh && setLoading(true)
        refresh && setRefreshLoading(true)

        const isProject = !!project

        const { data } = await ChatEntities.ChatService.getChat({
          skip,
          limit: 10,
          members: [user?._id || ''],
          sortBy: 'lastMessageDate',
          order: -1,
          project,
          isProject: isProject,
        })

        setTotalCount(data.totalCount)

        if (skip === 0) {
          isProject && dispatch(chatActions.setProjectChatList(data.docs))
          !isProject && dispatch(chatActions.setChatList(data.docs))
        }

        if (skip > 0) {
          isProject && dispatch(chatActions.setProjectChatListMore(data.docs))
          !isProject && dispatch(chatActions.setChatListMore(data.docs))
        }

        dispatch(chatActions.getAllUnreadCountRequest({}))
      } catch (err) {
        console.error('useGetChats err =>', err)
      } finally {
        !refresh && setLoading(false)
        refresh && setRefreshLoading(false)
      }
    },
    [dispatch, user?._id, project],
  )

  const { ...paginationProps } = usePagination({
    getAction: getChats,
    items: currentChats,
    loading: loading,
    totalCount,
  })

  return {
    chatList: currentChats,
    getChats,
    loading,
    setLoading,
    refreshLoading,
    setRefreshLoading,
    ...paginationProps,
  }
}
