import { TUser } from '@/entities/User/models'

export type TCustomerUserAboutProps = {} & Partial<Pick<TUser, 'about'>>
