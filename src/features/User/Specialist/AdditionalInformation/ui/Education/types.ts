import { TUser } from '@/entities/User/models'

export type TAddInfoEducationProps = { isEdit?: boolean } & Partial<
  Pick<TUser, 'education'>
>
