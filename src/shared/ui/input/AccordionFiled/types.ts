import { TMargin } from '../../utils'

export type TAccordionFiledProps = {
  active?: boolean
  renderContent?: () => JSX.Element
  renderHeader?: (isActive: boolean) => JSX.Element
} & Partial<TContainer>

export type TContainer = {
  width: string
} & TMargin
