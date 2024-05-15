import { TInterest } from './../../../entities/Interests/models/common'
import { SetStateAction } from 'react'

export type TProjectMainFiltersProps = {
  setSelectedInterests: React.Dispatch<SetStateAction<TInterest[]>>
  selectedInterests: TInterest[]
}
