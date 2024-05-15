import { TUser } from '@/entities/User/models'

export type TUserCustomerJobProps = { isEdit?: boolean } & Partial<
  Pick<TUser, '_id'>
>

export type TSortProps = {
  type: EUserProjectsSortType
  sortBy: string
  order: number
}

export enum EUserProjectsSortType {
  old_to_new = 'old_to_new',
  new_to_old = 'new_to_old',
}
