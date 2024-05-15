import { Icon } from '@/shared/ui/Icon'
import React from 'react'
import { TMessageChatPeaceProps } from './types'
import { EColors } from '@/shared/ui/Styled'

export const IconPeace = ({ isMy = false }: TMessageChatPeaceProps) => {
  const ScaleX = isMy ? 1 : -1
  const MarginIcon = isMy ? { marginLeft: -3 } : { marginRight: -3 }
  const iconColor = isMy ? EColors.primary : EColors.white

  return (
    <Icon
      size={0}
      width={10}
      height={32}
      fill={iconColor}
      style={[{ transform: [{ scaleX: ScaleX }] }, MarginIcon]}
      name={'ChatPeace'}
    />
  )
}
