import { THashTag } from '@/entities/User/models'

export type TAdditionalSkills = {
  setSkills?: (value: THashTag[]) => void
  skills?: THashTag[]
}
