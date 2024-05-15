import { useCallback, useState } from 'react'

import { TUseGetChatByMembers } from './types'
import { ChatEntities } from '@/entities/Chat'
import { useTypedSelector } from '@/app/store'
import { chatActions, getChatSelector } from '@/entities/Chat/store'
import { useDispatch } from 'react-redux'
import { usePagination } from '@/features/hooks'
import { onGetCurrentMessages } from './helpers'

const LIMIT = 30

export const useGetChatByMembers = ({
  id,
  limit = LIMIT,
  isProject = false,
}: TUseGetChatByMembers) => {
  const { chatMessages, projectChatMessages } =
    useTypedSelector(getChatSelector)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const currentChat = [...chatMessages, ...projectChatMessages].find(
    item => item.chatId === id,
  )

  const dispatch = useDispatch()

  const getChats = useCallback(
    async (skip: number) => {
      try {
        setLoading(true)

        const { data } = await ChatEntities.ChatService.getChatMessage({
          id,
          skip,
          limit,
        })

        setTotalCount(data.totalCount)

        if (skip === 0)
          dispatch(
            chatActions.setChatMessage({
              message: {
                chatId: id,
                messages: data.docs,
              },
              isProject,
            }),
          )

        if (skip > 0)
          dispatch(
            chatActions.setChatMessageMore({
              message: {
                chatId: id,
                messages: data.docs,
              },
              isProject,
            }),
          )
      } catch (err) {
        console.error('useGetChatByMembers err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [dispatch, id, limit, currentChat?.messages.length],
  )

  const { ...paginationProps } = usePagination({
    getAction: getChats,
    items: currentChat?.messages || [],
    loading: loading,
    totalCount,
  })

  return {
    chatMessages: onGetCurrentMessages(id, [
      ...chatMessages,
      ...projectChatMessages,
    ]),
    getChats,
    ...paginationProps,
  }
}
