import React from 'react'
import { TUserEmptyProps } from './types'

import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'

export const Empty = ({ title, icon }: TUserEmptyProps) => {
  return (
    <FlexWrapper flexDirection={'column'}>
      <Icon size={180} name={icon} />
      <MRegular mTop={'12px'} align={'center'} color={EColors.grey_600}>
        {title}
      </MRegular>
    </FlexWrapper>
  )
}
