import { TMessage } from '@/entities/Chat/models'

export type TMessageChatImagesProps = {
  onPress?: (index: number) => void
  isMy?: boolean
} & Partial<Pick<TMessage, 'files'>>
