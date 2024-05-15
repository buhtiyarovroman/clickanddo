import { THashTag } from '@/entities/User/models'
import { TFilterProjectData } from '@/entities/User/models/getUserProject'

export type THomeSpecialistHeadProps = {
  selectedHashtag: THashTag[]
  setSelectedHashtag: (value: THashTag[]) => void
  filterData?: TFilterProjectData
}
