import { TPublication } from '@/entities/Publication/models'

export type TPublicationResponsesScreenParams = {
  id: string
} & Pick<TPublication, 'projects' | 'type'>
