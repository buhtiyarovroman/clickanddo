import React from 'react'
import { StyledButton, StyledText } from './styled'
import { TStandard } from './types'
import { EColors } from '../../Styled'
import { Icon } from '../../Icon'

export const Standard = ({
  children,
  width = '100%',
  height = '52px',
  color = EColors.primary,
  text,
  textColor = EColors.white,
  mTop = '0px',
  mBottom = '0px',
  mLeft = '0px',
  mRight = '0px',
  disabled = false,
  radius = 12,
  icon,
  hideBorder = false,
  iconProps = {},
  opacity = 0.5,
  ...props
}: TStandard) => {
  return (
    <StyledButton
      activeOpacity={opacity}
      color={color}
      width={width}
      height={height}
      mTop={mTop}
      mBottom={mBottom}
      radius={radius}
      mLeft={mLeft}
      mRight={mRight}
      disabled={!!disabled}
      hideBorder={hideBorder}
      {...props}>
      {!!icon && <Icon name={icon} {...iconProps} />}
      {!!text && (
        <StyledText
          mLeft={!!icon ? '8px' : '0px'}
          color={textColor}
          disabled={!!disabled}>
          {text}
        </StyledText>
      )}
      {children}
    </StyledButton>
  )
}
