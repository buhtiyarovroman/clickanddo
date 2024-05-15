import { ReactNode } from 'react'

export type TLoaderContext = {
  loader: boolean
  setLoading: (value: boolean) => void
}
export type TLoaderProviderProps = {
  children: ReactNode
}
