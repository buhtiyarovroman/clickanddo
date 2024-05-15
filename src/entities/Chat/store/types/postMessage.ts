import { TPostChatMessageRequest } from '../../models'

export type TPostMessage = TPostChatMessageRequest['payload'] & {
  userId: string
}
