import { TUser } from '@/entities/User/models'
import { TMargin } from '@/shared/ui/utils'

export type TUserOfferProps = { isEdit?: boolean } & Partial<TStyledContainer> &
  Partial<
    Pick<
      TUser,
      'languages' | 'education' | 'work' | 'anotherExperience' | 'status'
    >
  >

export type TStyledContainer = {
  width: string
} & TMargin
