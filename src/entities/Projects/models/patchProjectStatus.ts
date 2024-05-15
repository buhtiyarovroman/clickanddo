import { TRequest } from '@/app/store/types'
import { TProject } from './common'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'

export type TPatchProjectStatusRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  status: `${EProjectTypes}`
}

type TResponse = TProject
