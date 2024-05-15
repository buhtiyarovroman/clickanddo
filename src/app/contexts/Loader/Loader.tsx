import React from 'react'
import { createContext, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { TLoaderContext, TLoaderProviderProps } from './types'
import { styles } from './styled'
import { EColors } from '@/shared/ui/Styled'

export const LoaderContext = createContext<TLoaderContext>({
  loader: false,
  setLoading: () => {},
})

export const LoaderWrapper = ({ children }: TLoaderProviderProps) => {
  const [loader, updateLoaderState] = useState<boolean>(false)

  const setLoading = (value: boolean) => {
    updateLoaderState(value)
  }

  return (
    <LoaderContext.Provider value={{ loader, setLoading }}>
      {loader && (
        <View style={styles.main}>
          <ActivityIndicator size="large" color={EColors.primary_D1} />
        </View>
      )}
      {children}
    </LoaderContext.Provider>
  )
}
