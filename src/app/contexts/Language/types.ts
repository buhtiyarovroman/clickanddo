import { ELanguages } from '@/app/i18n'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export type TLanguageProvider = {
  language: ELanguages
  setLanguage: Dispatch<SetStateAction<ELanguages>>
}

export type TLanguageProviderProps = {
  children: ReactNode
}
