import { AdditionalInformation } from '../../features/User/Specialist/AdditionalInformation'
import { Empty } from './Empty'
import { Offer } from './Offer'
import { ReviewCard } from './ReviewCard'
import { UserService } from './services'

export * from './store'

export const UserEntities = {
  UserService,
  Offer,
  ReviewCard,
  AdditionalInformation,
  Empty,
}
