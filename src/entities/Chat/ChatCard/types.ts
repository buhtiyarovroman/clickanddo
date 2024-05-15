import { TChat } from '../models'

export type TChatCardProps = {
  onRefresh?: () => void
  onPress?: () => void
} & Partial<
  Pick<
    TChat,
    'members' | 'updatedAt' | 'lastMessage' | 'seenDate' | '_id' | 'unreadCount'
  >
>
