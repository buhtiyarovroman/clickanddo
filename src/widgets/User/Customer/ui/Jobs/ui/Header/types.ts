import { EUserProjectsSortType, TSortProps } from '../../types'

export type TUserCustomerProjectsHeaderProps = {
  sortType?: EUserProjectsSortType
  onChangeSort?: (value: TSortProps) => void
}
