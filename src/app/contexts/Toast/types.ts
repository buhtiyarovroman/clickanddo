import { ReactNode } from 'react'

export type TToastContext = {
  actions: TToastContextActions
}

export type TToastContextProps = {
  children: ReactNode
}

export type TToastContextActions = {
  emptyCar: (value: string) => void
  authError: (error: string) => void
  handleErrorTranslate: (error: string) => void
  succesAddCar: () => void
}

export type TErrorData = {
  message: string
}

export enum EToastType {
  error = 'error',
  success = 'success',
}
