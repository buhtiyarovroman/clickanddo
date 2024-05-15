import { TRequest, TResponseDocs } from '@/app/store/types'
import { EUserRole, TUser } from './common'

export type TGetAllUsersRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  firebaseId: string
  location: number[]
  maxDistance: number
  role: `${EUserRole}`
  page: number
  skip: number
  limit: number
  order: 1 | -1
  sortBy: string
}>

type TResponse = TResponseDocs<TUser[]>
