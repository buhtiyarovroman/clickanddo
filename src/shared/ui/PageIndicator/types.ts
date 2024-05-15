import { TMargin } from '../utils'

export type TPageIndicator = {
  count?: number
  page?: number
  activeText?: boolean
} & TMargin

export type TStyledIndicator = {
  count: number
  width: number
  page: number
}
