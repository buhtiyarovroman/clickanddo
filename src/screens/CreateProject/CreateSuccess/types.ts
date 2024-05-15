import { TCreateProjectScreenParams } from '../types'

export type TProjectsCreateSuccessScreenParams = TCreateProjectScreenParams & {
  isDraft: boolean
  isSpecialist: boolean
}
