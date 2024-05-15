export type TCommentInputProps = {
  text?: string
  setText?: (value: string) => void
  createComment?: () => void
  replyTo?: string
  loading?: boolean
  onDeleteReplay?: () => void
}
