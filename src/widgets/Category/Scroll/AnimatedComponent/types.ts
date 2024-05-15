import { ReactNode } from 'react'

export type TAnimatedComponentProps = {
  isOpen?: boolean
  dataLength?: number
  singleHeight?: number
  globalHeight?: number
  children: ReactNode
}
