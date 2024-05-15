import React from 'react'
import { TRadioButtonProps } from './types'
import { StyledRadio, Checked } from './styled'

export const Radio = ({
  checked = false,
  onChange = () => {},
  ...props
}: TRadioButtonProps) => {
  return (
    <StyledRadio onPress={onChange} checked={checked} {...props}>
      {checked && <Checked />}
    </StyledRadio>
  )
}
