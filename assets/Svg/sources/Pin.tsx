import { Path, Svg } from 'react-native-svg'
import React from 'react'
import { EColors } from '@/shared/ui/Styled'

type TMapPinProps = {
  size?: number
  fill1?: EColors
  fill2?: EColors
}

export const MapPin = ({
  size = 40,
  fill1 = EColors.white,
  fill2 = EColors.success,
}: TMapPinProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        d="M18.5862 37.792C14.2414 33.0981 5 24.2625 5 15.9791C5 7.69573 11.7241 1 20.1724 1C28.1379 1 35 7.6267 35 15.9791C35 22.8474 28.3448 30.6069 21.4138 37.792C20.6414 38.5927 20.4483 39 19.9655 39C19.5862 39 19.069 38.3135 18.5862 37.792Z"
        fill={fill1}
      />
      <Path
        d="M20 34C21.1046 34 22 33.1046 22 32C22 30.8954 21.1046 30 20 30C18.8954 30 18 30.8954 18 32C18 33.1046 18.8954 34 20 34Z"
        fill={fill2}
      />
    </Svg>
  )
}
