import React from 'react'
import { IconContainer } from './styled'
import { TIconButtonProps } from './types'
import { Icon } from '../../Icon'

export const IconButton = ({
  onPress = () => {},
  icon = 'Pencel',
  iconSize = 14,
  ...props
}: TIconButtonProps) => {
  return (
    <IconContainer {...props} onPress={onPress}>
      <Icon name={icon} size={iconSize} />
    </IconContainer>
  )
}
