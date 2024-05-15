import { TFilterProjectData } from '@/entities/User/models/getUserProject'

export type THomeFilterBottomSheetProps = {
  onClose?: () => void
  filterData?: TFilterProjectData
}
