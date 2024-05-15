import { TPublication } from '@/entities/Publication/models'

export type TPublicationResponses = {
  publication?: TPublication
  onRefresh?: () => void
}
