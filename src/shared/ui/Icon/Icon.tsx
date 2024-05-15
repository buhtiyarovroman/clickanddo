import React from 'react'
import { TIconProps } from './types'
import { Svg } from '@assets/Svg'
import { EColors } from '../Styled'

export const Icon = ({
  name,
  fill,
  size = 24,
  height,
  width,
  style,
  ...props
}: TIconProps) => {
  const currentFill = fill || EColors.black
  const IconSvg = Svg[name]

  return (
    <IconSvg
      style={style}
      width={size || width}
      height={size || height}
      fill={currentFill}
      stroke={props.stroke}
      {...{ props }}
    />
  )
}
