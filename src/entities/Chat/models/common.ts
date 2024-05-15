import { TUser } from '@/entities/User/models'

export type TChat = {
  _id: string
  members: TUser[]
  updatedAt: string
  lastMessage?: TMessage
  seenDate: string | null
  unreadCount: number
  project?: string
}

export type TMessage = {
  chat: string
  files: string[]
  message: string
  from: string
  to: string
  seenDate: string | null
  id: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type TAllUnreadCount = {
  _id: string
  count: number
}
