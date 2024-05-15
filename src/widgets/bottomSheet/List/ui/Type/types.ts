import { EPublicationType } from '@/entities/Publication/models'

export type TListFilterTypeProps = {
  selected: EPublicationType[]
  setSelected: (value: EPublicationType[]) => void
}
