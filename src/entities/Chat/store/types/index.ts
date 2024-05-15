import { TAllUnreadCount, TChat, TMessage } from '../../models'

export type TInitialChatState = {
  chatMessages: TChatMessages[]
  localLastMessage: TLocalChatMessages[]
  loading: boolean
  chatList: TChat[]
  projectChatList: TChat[]
  projectChatMessages: TChatMessages[]
  allUnreadCount: TAllUnreadCount[]
}

export type TSetChatMessagesProps = {
  isProject: boolean
  message: TChatMessages
}

export type TChatMessages = {
  chatId: string
  messages: TMessage[]
}

export type TLocalChatMessages = {
  chatId: string
  messages: TLastLocalMessage[]
}

export type TLastLocalMessage = {
  id: string
  chat: string
  message?: string
  files?: string[]
  from: string
}

export type TSetSocketMessage = { message: TMessage; userId: string }
