import { TSchema } from '@/shared/lib/validation'
import { createPublicationSchema } from './validation'

export type TCreatePublicationFormProps = {
  onSuccess?: () => void
}

export type TCreatePublicationForm = TSchema<
  ReturnType<typeof createPublicationSchema>
>

export type TCreatePublicationFormRef = {
  getForm: () => Promise<TCreatePublicationForm | null>
}

export enum ECreatePublicationForm {
  images = 'images',
  location = 'location',
  title = 'title',
  hashtag = 'hashtag',
  description = 'description',
  price = 'price',
  currency = 'currency',
  coordinates = 'coordinates',
  hideLikes = 'hideLikes',
}
