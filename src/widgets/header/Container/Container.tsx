import React, { ReactElement, ReactNode, useContext } from 'react'
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import { EColors } from '@/shared/ui/Styled'
import { HeaderContainer } from './styled'
import { SafeAreaContext } from '@/app/contexts'

export type TWrapper = {
  isTransparent?: boolean
  children: ReactNode
  activeShadow?: boolean
  addHeight?: number
}

export const Container = ({
  isTransparent = false,
  children,
  activeShadow = false,
  addHeight = 0,
}: TWrapper): ReactElement => {
  const { edges } = useContext(SafeAreaContext)
  const insets = useSafeAreaInsets()
  const frame = useSafeAreaFrame()

  const isTop = edges.includes('top')
  const statusBarHeight = insets.top

  const defaultHeight = getDefaultHeaderHeight(
    frame,
    false,
    isTop ? 0 : statusBarHeight,
  )

  const getStyle = (): StyleProp<ViewStyle> => {
    if (isTransparent) {
      return {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
      }
    }

    return {
      backgroundColor: EColors.white,
    }
  }

  return (
    <>
      {!isTransparent && (
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={EColors.transparent}
          translucent
        />
      )}

      <HeaderContainer
        height={defaultHeight + addHeight}
        style={[getStyle(), activeShadow ? styles.shadow : {}]}>
        {children}
      </HeaderContainer>
    </>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
