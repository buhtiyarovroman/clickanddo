import { TUser } from '@/entities/User/models'

export type TUserSpecialistInfoAvatarProps = {
  isEdit?: boolean
  isCustomer?: boolean
} & Partial<Pick<TUser, 'photo'>>
