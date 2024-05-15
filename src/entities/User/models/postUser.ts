import { TRequest } from '@/app/store/types'
import { TUser } from './common'

export type TPostUserRequest = TRequest<TPayload, TResponse>

type TPayload = {
  name: string
  secondName?: string
  fatherName?: string
  country: string
  login: string
  email?: string
  phone?: string
  dateOfBirth: string
  gender: string
  role: string
  location: {
    type: 'Point'
    coordinates: number[]
  }
}

type TResponse = TUser
