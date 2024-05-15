import { ReactNode } from 'react'

export type TStandardModalProps = {
  children: ReactNode
}

export type TStandardModalRef = {
  open: () => void
  close: () => void
}
