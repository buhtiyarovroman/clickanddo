import { TCreateProjectData } from '@/entities/Projects/store/types'
import { TFourthCreateProjectData } from '@/features/Projects/FourthForm/types'

export const convertValidData = ({
  startDate,
  endDate,
  location,
  ...data
}: TFourthCreateProjectData): Partial<TCreateProjectData> => {
  const start = startDate || undefined
  const end = endDate || undefined

  const locationData = location?.length ? location : undefined

  return {
    endDate: end,
    startDate: start,
    location: locationData
      ? { type: 'Point', coordinates: locationData }
      : undefined,
    ...data,
  }
}
