import React, { createContext, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import { TThemeContextProps, TThemeProps } from './types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { EColors } from '@/shared/ui/Styled'

export const ThemeContext = createContext<TThemeContextProps>({})

export const ThemeWrapper = ({ children }: TThemeProps) => {
  const { top, bottom } = useSafeAreaInsets()

  const value = useMemo(
    () => ({ instTop: top, instBottom: bottom }),
    [top, bottom],
  )

  return (
    <ThemeContext.Provider value={{}}>
      <StatusBar backgroundColor={EColors.white} barStyle={'dark-content'} />
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
