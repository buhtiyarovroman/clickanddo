import { TChatMessages } from '@/entities/Chat/store/types'

export const onGetCurrentMessages = (
  chatId: string,
  store: TChatMessages[],
): TChatMessages => {
  let foundedChat = store.find(item => item.chatId === chatId)

  if (!foundedChat) {
    return {
      chatId,
      messages: [],
    }
  }

  return foundedChat
}
