import { THashTag } from '@/entities/User/models'

export type TSearchSkills = {
  mySkills?: THashTag[]
  onSelect?: (value: THashTag) => void
  onClose?: () => void
}
