import { TUser } from '@/entities/User/models'

export type TUserSpecialistInfoProps = {
  isEdit?: boolean
  isCustomer?: boolean
} & Partial<
  Pick<
    TUser,
    | 'login'
    | 'photo'
    | 'subscribers'
    | 'likes'
    | 'name'
    | 'secondName'
    | 'role'
    | '_id'
    | 'rating'
    | 'totalProjects'
    | 'activeProjects'
    | 'hashtag'
  >
>
