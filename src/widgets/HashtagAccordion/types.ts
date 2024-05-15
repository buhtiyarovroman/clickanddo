import { THashTag } from '@/entities/User/models'

export type THashtagAccordionProps = {
  autoOpen?: boolean

  searchLength?: number

  getDataHeight?: (value: number) => void
} & THashtagAccordionListDataProps

export type THashtagAccordionListDataProps = {
  selectedHashtag: THashTag[]
  setSelectedHashtag: (value: THashTag[]) => void

  searchableHashtag: THashTag[]
  setSearchableHashtag: (value: THashTag[]) => void

  onAddHashTag: () => void

  setSearch: (value: string) => void

  loading: boolean
}

export type THashtagAccordionListProps = {
  setDataHeight: (value: number) => void
  setResultHeight: (value: number) => void
} & THashtagAccordionListDataProps
