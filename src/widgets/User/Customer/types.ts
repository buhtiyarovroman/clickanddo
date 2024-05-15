import { TUser } from '@/entities/User/models'

export type TWidgetUserCustomer = { isEdit?: boolean; user: TUser | null }

export enum EProfileCustomerTabs {
  jobs = 'jobs',
  reviews = 'reviews',
}
