import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  TInitialChatState,
  TLastLocalMessage,
  TSetChatMessagesProps,
  TSetSocketMessage,
} from './types'
import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'
import { TChat, TMessage, TPostSeenRequest } from '../models'
import {
  onChangeAllCounters,
  onChatCounterChatList,
  onFilterAllCounters,
  onFilterChatMessagesList,
  onFilterLocalLastMessage,
  onReadMessagesOnChat,
  onSetLastMessages,
  onSetMessageInChats,
  onSetMessageInChatsOnSocket,
} from './helper'

const initialState: TInitialChatState = {
  loading: false,
  chatMessages: [],
  localLastMessage: [],
  chatList: [],
  projectChatList: [],
  projectChatMessages: [],
  allUnreadCount: [],
}

export const slice = createSlice({
  name: EStoreReducer.chat,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialChatState>(),
    clearState: Reducers.clearState<TInitialChatState>(initialState),
    // setError: Reducers.setError<TInitialUserState>(),

    setLastMessage: (state, { payload }: PayloadAction<TLastLocalMessage>) => {
      state.localLastMessage = onSetLastMessages(
        state.localLastMessage,
        payload,
      )
    },

    setSocketMessage: (
      state,
      { payload: { message, userId } }: PayloadAction<TSetSocketMessage>,
    ) => {
      state.chatMessages = onSetMessageInChatsOnSocket(
        state.chatMessages,
        message,
        false,
      )
      state.projectChatMessages = onSetMessageInChatsOnSocket(
        state.projectChatMessages,
        message,
        true,
      )
      state.localLastMessage = onFilterLocalLastMessage(
        state.localLastMessage,
        message,
      )
      state.chatList = onChatCounterChatList(
        state.chatList,
        message,
        false,
        userId,
      )
      state.projectChatList = onChatCounterChatList(
        state.projectChatList,
        message,
        true,
        userId,
      )
      state.allUnreadCount = onChangeAllCounters(
        state.allUnreadCount,
        [...state.chatList, ...state.projectChatList],
        userId,
        message.chat,
      )
    },

    clearLastMessage: (
      state,
      { payload }: PayloadAction<TLastLocalMessage>,
    ) => {
      state.localLastMessage = onFilterLocalLastMessage(
        state.localLastMessage,
        payload as TMessage,
      )
    },

    setChatMessage: (
      state,
      { payload }: PayloadAction<TSetChatMessagesProps>,
    ) => {
      state.chatMessages = onSetMessageInChats(
        state.chatMessages,
        payload.message,
        false,
        payload.isProject,
      )
      state.projectChatMessages = onSetMessageInChats(
        state.projectChatMessages,
        payload.message,
        true,
        payload.isProject,
      )
    },

    setChatMessageMore: (
      state,
      { payload }: PayloadAction<TSetChatMessagesProps>,
    ) => {
      state.chatMessages = onSetMessageInChats(
        state.chatMessages,
        payload.message,
        false,
        payload.isProject,
        true,
      )
      state.projectChatMessages = onSetMessageInChats(
        state.projectChatMessages,
        payload.message,
        true,
        payload.isProject,
        true,
      )
    },

    setChatList: (state, { payload }: PayloadAction<TChat[]>) => {
      state.chatList = payload
      state.chatMessages = onFilterChatMessagesList(payload, state.chatMessages)
    },

    setChatListMore: (state, { payload }: PayloadAction<TChat[]>) => {
      state.chatList = [...state.chatList, ...payload]
      state.chatMessages = onFilterChatMessagesList(
        [...state.chatList, ...payload],
        state.chatMessages,
      )
    },

    setProjectChatList: (state, { payload }: PayloadAction<TChat[]>) => {
      state.projectChatList = payload
      state.projectChatMessages = onFilterChatMessagesList(
        payload,
        state.projectChatMessages,
      )
    },

    setProjectChatListMore: (state, { payload }: PayloadAction<TChat[]>) => {
      state.projectChatList = [...state.chatList, ...payload]
      state.projectChatMessages = onFilterChatMessagesList(
        [...state.projectChatList, ...payload],
        state.projectChatMessages,
      )
    },

    readMessagesOnChat: (
      state,
      { payload }: PayloadAction<TPostSeenRequest['payload']>,
    ) => {
      state.allUnreadCount = onFilterAllCounters(
        state.allUnreadCount,
        payload.id,
      )
      state.chatList = onReadMessagesOnChat(state.chatList, payload.id)
      state.projectChatList = onReadMessagesOnChat(
        state.projectChatList,
        payload.id,
      )
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
