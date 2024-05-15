import { TPublicationCommentProps } from '../../types'

export type TPublicationCommentItemProps = Omit<
  TPublicationCommentProps,
  'publicationId'
>
