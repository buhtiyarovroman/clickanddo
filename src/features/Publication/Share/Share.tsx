import React from 'react'
import { Touchable } from './styled'
import { TShareButtonProps } from './types'

import { Icon } from '@/shared/ui/Icon'
import { useShare } from '../hooks/useShare'

export const ShareButton = ({ publication, ...props }: TShareButtonProps) => {
  const { onShare } = useShare({ publication })

  return (
    <Touchable {...props} onPress={onShare}>
      <Icon name="Share" size={20} />
    </Touchable>
  )
}
