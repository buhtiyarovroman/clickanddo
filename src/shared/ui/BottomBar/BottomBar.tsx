import React, { FC } from 'react'
import { TCustomBottomBar } from './types'
import { ContentContainer } from './styled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LayoutChangeEvent, StyleSheet } from 'react-native'

export const BottomBar: FC<TCustomBottomBar> = ({
  children,
  containerStyle = {},
  withoutMargin = false,
  getHeight = () => {},
}) => {
  const { bottom } = useSafeAreaInsets()

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    getHeight(height)
  }

  return (
    <ContentContainer
      onLayout={handleLayout}
      bottomInst={withoutMargin ? 10 : bottom}
      style={[styles.shadow, containerStyle]}>
      {children}
    </ContentContainer>
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
