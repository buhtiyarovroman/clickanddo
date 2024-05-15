import { TUser } from '@/entities/User/models'

export type TAddInfoLanguagesProps = { isEdit?: boolean } & Partial<
  Pick<TUser, 'languages'>
>
