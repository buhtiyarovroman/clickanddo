import { TProject } from '@/entities/Projects/models'
import { TCreateProjectData } from '@/entities/Projects/store/types'

export const formattingProjectData = (data: TProject): TCreateProjectData => {
  return {
    id: data._id,
    additionalService: data.additionalService,
    budget: data.budget,
    currency: data.currency,
    description: data.description,
    endDate: data.endDate,
    hashtag: data.hashtag,
    images: data.images,
    name: data.name,
    relevantUntil: data.relevantUntil,
    startDate: data.startDate,
    location: {
      ...data.location,
      type: 'Point',
    },
    status: data.status,
  }
}
