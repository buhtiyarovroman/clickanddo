import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Background } from './styled'
import { EColors } from '../../Styled'

type TStandard = {
  color?: EColors
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  pHorizontal?: number
}

export const Standard = ({
  children,
  color = EColors.white,
  pHorizontal = 0,
  style,
  ...props
}: TStandard) => {
  return (
    <Background
      style={[{ paddingHorizontal: pHorizontal }, style]}
      color={color}
      {...props}>
      {children}
    </Background>
  )
}
