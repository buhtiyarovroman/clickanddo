import { THashTag } from '@/entities/User/models'

export type TProjectCreateSecondHashtagProps = {
  hashtag?: THashTag[]
  onChange?: (value: THashTag[]) => void
  error?: string
  limit?: number
  withTitle?: boolean
  selectOnUserHashtags?: boolean
  hideSearchIcon?: boolean
}
