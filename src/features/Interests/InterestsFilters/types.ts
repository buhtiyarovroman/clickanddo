import { TInterest } from './../../../entities/Interests/models/common'
export type TInterestsFiltersProps = {
  interest?: TInterest[]
  onChange?: (value: TInterest[]) => void
  error?: string
  limit?: number
}
