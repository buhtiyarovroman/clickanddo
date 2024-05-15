import { useContext } from 'react'

import { TUseCreateChat } from './types'
import { ChatEntities } from '@/entities/Chat'
import { useTypedSelector } from '@/app/store'

import { getUserSelector } from '@/entities/User'
import { LoaderContext } from '@/app/contexts/Loader'
import { EScreens, ETabStacks } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'
import { getChatSelector } from '@/entities/Chat/store'

export const useCreateChat = ({}: TUseCreateChat) => {
  const { setLoading } = useContext(LoaderContext)
  const { user } = useTypedSelector(getUserSelector)
  const { chatList, projectChatList } = useTypedSelector(getChatSelector)
  const { navigate } = useNavigation()

  const onCreateChat = async (
    _id: string | undefined,
    project?: string,
    disableNavigation?: boolean,
  ) => {
    try {
      setLoading(true)
      if (!_id || !user?._id) {
        console.error('no have specialist id')
        return
      }

      let chatId = ''

      let currentList = !!project ? projectChatList : chatList

      let foundedChat = currentList.find(
        item =>
          item.members.map(users => users._id).includes(_id) &&
          (!!project ? item.project === project : true),
      )

      if (foundedChat) {
        chatId = foundedChat._id
      } else {
        const response = await ChatEntities.ChatService.getChat({
          members: [user?._id!, _id],
          project,
          isProject: !!project,
        })

        if (response.data.docs.length) {
          chatId = response.data.docs[0]._id
        }

        if (!response.data.docs.length) {
          const responsePost = await ChatEntities.ChatService.postChat({
            members: _id,
            project,
          })
          chatId = responsePost.data._id
        }
      }

      !disableNavigation &&
        navigate(ETabStacks.Chat, {
          screen: EScreens.ChatChat,
          params: {
            id: chatId,
            to: _id,
            isProject: !!project,
          },
          initial: false,
        })

      return chatId
    } catch (err) {
      console.log('onCreateChat err =>', err)
    } finally {
      setLoading(false)
    }
  }
  return {
    onCreateChat,
  }
}
