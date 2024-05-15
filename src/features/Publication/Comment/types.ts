import { TComment } from '@/entities/Publication/models'
import { TLocalReplyTo } from '@/widgets/Publication/Comments/types'

export type TPublicationCommentProps = {
  publicationId?: string
  onPressReplayTo?: (user: TLocalReplyTo) => void
} & Partial<
  Pick<
    TComment,
    | '_id'
    | 'owner'
    | 'createdAt'
    | 'comment'
    | 'replyTo'
    | 'replies'
    | 'repliesCount'
  >
>
