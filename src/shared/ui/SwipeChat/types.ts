import { ReactNode } from 'react'

export type TSwipeChatProps = {
  onPressRemove?: () => void
  children: ReactNode
  renderLeftActions?: () => JSX.Element
}
