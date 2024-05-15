import { TProject } from '@/entities/Projects/models'

export type TProjectsJobScreenParams = {
  project: TProject
}

export enum EJobScreenTab {
  description = 'description',
  responses = 'responses',
  specialists = 'specialists',
}
