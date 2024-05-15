import { PropsWithChildren } from 'react'

export type TModalViewProps = PropsWithChildren<{
  isBottom?: boolean
  isVisible: boolean
  setVisible: (val: boolean) => void
}>

export type TModalViewRef = {
  open: () => void
  close: () => void
}
