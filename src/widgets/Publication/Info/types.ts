import { EPublicationType } from '@/entities/Publication/models'
import { TPublication } from '../../../entities/Publication/models/common'
export type TInfoProps = {
  publication: TPublication
  type: `${EPublicationType}`
} & Partial<
  Pick<
    TPublication,
    | '_id'
    | 'createdAt'
    | 'relevantUntil'
    | 'address'
    | 'category'
    | 'subcategory'
    | 'description'
    | 'likes'
  >
>
