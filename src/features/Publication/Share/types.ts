import { TPublication } from '@/entities/Publication/models'
import { TMargin } from '@/shared/ui/utils'

export type TShareButtonProps = {
  publication: TPublication | undefined
} & TMargin
