import { TUser } from '@/entities/User/models'

export type TAddInfoVerificationProps = {
  isEdit?: boolean
} & Partial<Pick<TUser, 'status'>>
