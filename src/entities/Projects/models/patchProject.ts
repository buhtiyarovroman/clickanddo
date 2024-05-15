import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import {
  TCreateProjectResponses,
  TLocationProject,
  TPostAdditionalServiceProject,
  TProject,
} from './common'
import { TRequest } from '@/app/store/types'
export type TPatchProject = TRequest<TPayload, TResponse>

export type TPayload = {
  id: string
  data: {
    name: string
    description: string
    hashtag: string[]
    additionalService?: TPostAdditionalServiceProject
    location?: TLocationProject
    startDate?: string
    endDate?: string
    relevantUntil: string
    budget: number
    currency: string
    status?: `${EProjectTypes}`
    specialist?: string
    projectResponses?: TCreateProjectResponses[]
    address?: string
  }
}

export type TResponse = TProject
