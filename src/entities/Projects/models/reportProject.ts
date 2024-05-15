import { TRequest } from './../../../app/store/types'
export type TReportProject = TRequest<TPayload, TResponse>

export type TPayload = {
  projectId: string
  reportText: string
}

export type TResponse = {}
