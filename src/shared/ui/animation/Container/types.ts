import { ReactNode, JSX } from 'react'

export type TContainerProps = {
  autoOpen?: boolean
  hasInstTop?: boolean

  dataLength?: number
  searchLength?: number
  resultLength?: number

  dataHeight?: number
  resultHeight?: number

  inputChildren?: () => JSX.Element
  children: ReactNode
}
