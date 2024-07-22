import { ReactNode } from 'react'

export enum EPushType {
  project = 'project',
  publication = 'publication',
  chat = 'chat',
  user = 'user',
}

export type TNotificationPayload = {
  recipients: string[]
  type: EPushType
  id: string
  action: TPushActionEnum
}

export type TPushNotificationContext = {
  children: ReactNode
}

export type TNotificationContextPayload = {
  enablePush: (enable: boolean) => void
  playerId: string
}

export enum TPushActionEnum {
  project_done = 'project_done',
  project_responded = 'project_responded',
  created_personal_project = 'created_personal_project',
  publication_responded = 'publication_responded',
}
