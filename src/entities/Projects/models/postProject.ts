import { TRequest } from '@/app/store/types'
import {
  TCreateProjectResponses,
  TLocationProject,
  TPostAdditionalServiceProject,
  TProject,
} from './common'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { EPublicationType } from '@/entities/Publication/models'

export type TPostProjectRequest = TRequest<TPayload, TResponse>

type TPayload = {
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
  status?: EProjectTypes
  specialist?: string
  projectResponses?: TCreateProjectResponses[]
  address?: string
  origin?: string
  originType?: `${EPublicationType}`
}

type TResponse = TProject
