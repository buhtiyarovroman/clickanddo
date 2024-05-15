import { TMessage } from '../models'

export type TMessageProps = {
  onPress?: () => void
  isLastGroupMessage?: boolean
} & Partial<
  Pick<TMessage, '_id' | 'message' | 'from' | 'createdAt' | 'files' | 'to'>
>
