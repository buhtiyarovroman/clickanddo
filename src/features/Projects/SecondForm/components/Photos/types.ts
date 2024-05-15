import { TImageType } from '@/shared/ui/image/Standard/types'

export type TProjectCreateSecondPhotosProps = {
  photos?: TPhotosProps[]
  withTitle?: boolean
  onChange?: (value: TPhotosProps[]) => void
  imageType?: TImageType
}

export type TPhotosProps = {
  id: string
  path: string
}
