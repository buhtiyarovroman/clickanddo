import {
  EPublicationType,
  TPublication,
} from '@/entities/Publication/models/common'
export type TActionsProps = {
  publication: TPublication
  onGetPublication?: () => void
  type: `${EPublicationType}`
}
