export type TProjectResponsesChatsScreenParams = {
  id: string
  title: string
  specialist: boolean
  tabType?: EProjectResponsesChatsTabs
}

export enum EProjectResponsesChatsTabs {
  chats = 'chats',
  responses = 'responses',
}
