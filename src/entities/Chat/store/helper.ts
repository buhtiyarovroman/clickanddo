import { TAllUnreadCount, TChat, TMessage } from '../models'
import { TChatMessages, TLastLocalMessage, TLocalChatMessages } from './types'

export const onFilterLocalLastMessage = (
  store: TLocalChatMessages[],
  payload: TMessage,
): TLocalChatMessages[] => {
  let foundedChat = store.find(item => item.chatId === payload.chat)

  if (!foundedChat) {
    return store
  }

  foundedChat = {
    ...foundedChat,
    messages: foundedChat.messages.filter(
      itemLast => itemLast.id !== payload.id,
    ),
  }

  let tempStore = store.map(item => {
    if (item.chatId === foundedChat?.chatId) {
      return foundedChat
    }
    return item
  })

  return tempStore.filter(item => item.messages.length > 0)
}

export const onSetMessageInChatsOnSocket = (
  store: TChatMessages[],
  payload: TMessage,
  isProject: boolean,
): TChatMessages[] => {
  let foundedChat = store.find(item => item.chatId === payload.chat)

  if (!foundedChat) {
    return store
  }

  if (isProject) {
  }

  foundedChat.messages = [payload, ...foundedChat.messages]

  let tempStore = store.map(item => {
    if (item.chatId === foundedChat?.chatId) {
      return foundedChat
    }
    return item
  })

  return tempStore
}

export const onSetMessageInChats = (
  store: TChatMessages[],
  payload: TChatMessages,
  isSetOnProjectChat: boolean, //false
  isProjectMessage: boolean, //true
  isSetMore: boolean | undefined = false,
): TChatMessages[] => {
  if (isProjectMessage) {
    if (!isSetOnProjectChat) return store
  }

  if (!isProjectMessage) {
    if (isSetOnProjectChat) return store
  }

  let foundedChat = store.find(item => item.chatId === payload.chatId)

  if (!foundedChat) {
    return [...store, payload]
  }

  if (isSetMore) {
    foundedChat.messages = [...foundedChat.messages, ...payload.messages]
  }

  if (!isSetMore) {
    foundedChat.messages = payload.messages
  }

  let tempStore = store.map(item => {
    if (item.chatId === foundedChat?.chatId) {
      return foundedChat
    }
    return item
  })

  return tempStore
}

export const onSetLastMessages = (
  store: TLocalChatMessages[],
  payload: TLastLocalMessage,
): TLocalChatMessages[] => {
  let foundedChat = store.find(item => item.chatId === payload.chat)

  if (!foundedChat) {
    return [...store, { chatId: payload.chat, messages: [payload] }]
  }

  foundedChat.messages = [...foundedChat.messages, payload]

  let tempStore = store.map(item => {
    if (item.chatId === foundedChat?.chatId) {
      return foundedChat
    }
    return item
  })

  return tempStore
}

export const onFilterChatMessagesList = (
  store: TChat[],
  listMessage: TChatMessages[],
): TChatMessages[] => {
  let idsChats = store.map(item => item._id)

  return listMessage.filter(el => idsChats.includes(el.chatId))
}

export const onChatCounterChatList = (
  store: TChat[],
  lastMessage: TMessage,
  isProjectChat: boolean,
): TChat[] => {
  let foundedChat = store.find(item => item._id === lastMessage.chat)

  if (!foundedChat) {
    return store
  }

  if (foundedChat.project) {
    if (!isProjectChat) return store
  }

  let tempChat = {
    ...foundedChat,
    lastMessage: lastMessage,
    unreadCount: foundedChat.unreadCount + 1,
  }

  let tempStore = store.map(item => {
    if (item._id === foundedChat?._id) {
      return tempChat
    }
    return item
  })

  return tempStore
}

export const onChangeAllCounters = (
  store: TAllUnreadCount[],
  chats: TChat[],
  userId: string,
  chat: string,
): TAllUnreadCount[] => {
  let foundedCount = store.find(item => item._id === userId)

  let foundedChat = chats.find(item => item._id === chat)

  if (!foundedCount) {
    return store
  }

  if (!!foundedChat?.project) {
    return store
  }

  let tempCount = {
    ...foundedCount,
    count: foundedCount.count + 1,
  }

  let tempStore = store.map(item => {
    if (item._id === tempCount._id) {
      return tempCount
    }
    return item
  })

  return tempStore
}

export const onFilterAllCounters = (
  store: TAllUnreadCount[],
  id: string,
): TAllUnreadCount[] => {
  let foundedCount = store.find(item => item._id === id)

  if (!foundedCount) {
    return store
  }

  let tempCount = {
    ...foundedCount,
    count: 0,
  }

  let tempStore = store.map(item => {
    if (item._id === tempCount._id) {
      return tempCount
    }
    return item
  })

  return tempStore
}

export const onReadMessagesOnChat = (store: TChat[], id: string): TChat[] => {
  let foundedChat = store.find(item => item._id === id)

  if (!foundedChat) {
    return store
  }

  let tempCount = {
    ...foundedChat,
    unreadCount: 0,
  }

  let tempStore = store.map(item => {
    if (item._id === tempCount._id) {
      return tempCount
    }
    return item
  })

  return tempStore
}
