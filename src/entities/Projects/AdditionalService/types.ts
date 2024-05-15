import { TProject } from '../models'

export type TProjectPreviewAdditionalServiceProps = {} & Partial<
  Pick<TProject, 'additionalService'>
>
