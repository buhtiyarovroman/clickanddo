import { TUser } from '@/entities/User/models'

export type TCustomerHeadProps = {
  user?: TUser | null
  isEdit?: boolean
}
