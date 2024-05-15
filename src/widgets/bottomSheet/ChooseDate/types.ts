import { TPublication } from '@/entities/Publication/models'

export type TChooseDateBottomSheetProps = {
  onClose?: () => void
  onRefresh?: () => void
  publication?: TPublication
}
