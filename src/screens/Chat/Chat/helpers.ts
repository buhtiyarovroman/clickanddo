import { TLocalChatMessages } from '@/entities/Chat/store/types'

export const onGetCurrentLastMessages = (
  chatId: string,
  store: TLocalChatMessages[],
): TLocalChatMessages => {
  let foundedChat = store.find(item => item.chatId === chatId)

  if (!foundedChat) {
    return {
      chatId,
      messages: [],
    }
  }

  return foundedChat
}
