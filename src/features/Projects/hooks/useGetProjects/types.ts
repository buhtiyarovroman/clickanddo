import { TGetUserProjects } from '@/entities/User/models/getUserProject'

export type TUseGetProjectProps = {
  limit?: number
  owner?: string
  specialist?: string
  status?: string[]
  projectResponses?: string
  hashtag?: string[]
  location?: number[]
  maxDistance?: number
  interest?: string[]
  sortBy?: string
  order?: number
  relevantUntil?: string
  radius?: number
  priceTo?: number
  priceFrom?: number
} & Partial<
  Pick<
    TGetUserProjects['payload'],
    'createdHb' | 'createdLb' | 'relevantUntilHb' | 'relevantUntilLb'
  >
>
