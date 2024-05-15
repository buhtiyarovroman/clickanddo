import { TResponse } from '@/app/store/types'

import { apiPrivate } from '@/features/api'

import {
  TGetChatRequest,
  TPostChatRequest,
  TGetChatByIdRequest,
  TPostChatMessageRequest,
  TGetChatMessageRequest,
  TDeleteChatRequest,
  TPostSeenRequest,
  TGetAllUnreadCountRequest,
} from './models'
import { generateFormData } from '@/app/store/tools'

const path = '/user/chat'

export class ChatService {
  //get my Chats
  static async getChat(
    params: TGetChatRequest['payload'],
  ): TResponse<TGetChatRequest['response']> {
    return apiPrivate.get(path, { params })
  }

  //get all unread count
  static async getAllUnreadCounts(
    params: TGetAllUnreadCountRequest['payload'],
  ): TResponse<TGetAllUnreadCountRequest['response']> {
    return apiPrivate.get(`${path}/all-unread-count`, { params })
  }

  //post Chats
  static async postChat(
    data: TPostChatRequest['payload'],
  ): TResponse<TPostChatRequest['response']> {
    return apiPrivate.post(path, data)
  }

  //get Chat by Id
  static async getChatById({
    id,
    ...params
  }: TGetChatByIdRequest['payload']): TResponse<
    TGetChatByIdRequest['response']
  > {
    return apiPrivate.get(path + `/${id}`, { params })
  }

  //post Chat message
  static async postChatMessage({
    chat,
    ...data
  }: TPostChatMessageRequest['payload']): TResponse<
    TPostChatMessageRequest['response']
  > {
    const formData = generateFormData(data, ['file'])

    return apiPrivate.post(path + `/${chat}/message`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  //get Chat message
  static async getChatMessage({
    id,
    ...params
  }: TGetChatMessageRequest['payload']): TResponse<
    TGetChatMessageRequest['response']
  > {
    return apiPrivate.get(path + `/${id}/message`, { params })
  }

  //Delete Chat
  static async deleteChat({
    id,
  }: TDeleteChatRequest['payload']): TResponse<TDeleteChatRequest['response']> {
    return apiPrivate.delete(path + `/${id}`)
  }

  //post seen
  static async postSeen({
    id,
  }: TPostSeenRequest['payload']): TResponse<TPostSeenRequest['response']> {
    return apiPrivate.post(path + `/${id}/seen`)
  }
}
