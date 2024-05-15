import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { BackgroundSafeArea } from './styled'
import { EColors } from '../../Styled'
import { SafeAreaViewProps } from 'react-native-safe-area-context'

type TSaveAreaBackgroundProps = {
  color?: EColors
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  pHorizontal?: number
  edges?: SafeAreaViewProps['edges']
}

export const SafeArea = ({
  children,
  color = EColors.white,
  style,
  pHorizontal = 0,
  edges = ['bottom'],
  ...props
}: TSaveAreaBackgroundProps) => {
  return (
    <BackgroundSafeArea
      edges={edges}
      style={[{ paddingHorizontal: pHorizontal }, style]}
      color={color}
      {...props}>
      {children}
    </BackgroundSafeArea>
  )
}
