import { THashTag } from '@/entities/User/models'
import {
  TAdditionalServiceProject,
  TCreateProjectResponses,
} from '../../models'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { TGetUserProjects } from '@/entities/User/models/getUserProject'

export type TInitialProjectsState = {
  createProjects: TCreateProjectData
  loading: boolean

  filterHashtag: THashTag[]

  filterHome: {
    min?: number
    max?: number
    location?: {
      longitude?: number
      latitude?: number
      radius?: number
      address?: string
    }
  } & Pick<
    TGetUserProjects['payload'],
    'createdHb' | 'createdLb' | 'relevantUntilHb' | 'relevantUntilLb'
  >
}

export type TCreateProjectData = {
  id: string
  name: string
  description: string
  hashtag: THashTag[]
  images: string[]
  additionalService: TAdditionalServiceProject
  startDate?: string
  endDate?: string
  relevantUntil?: string
  budget?: number
  currency?: string
  location?: {
    type: 'Point'
    coordinates: number[]
  }
  status?: `${EProjectTypes}`
  specialist?: string
  projectResponses?: TCreateProjectResponses[]
  address?: string
}
