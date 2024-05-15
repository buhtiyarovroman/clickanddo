import React, { ReactNode } from 'react'
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'
import { Background } from './styled'

type TImage = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  pHorizontal?: number
  source: ImageSourcePropType
}

export const Image = ({
  children,
  pHorizontal = 0,
  style,
  source,
  ...props
}: TImage) => {
  return (
    <Background
      source={source}
      style={[{ paddingHorizontal: pHorizontal }, style]}
      {...props}>
      {children}
    </Background>
  )
}
