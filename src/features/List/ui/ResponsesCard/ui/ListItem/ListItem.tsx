import React from 'react'
import { TResponsesCardItemList } from './types'
import * as Styled from './styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'

export const ListItem = ({
  title = '',
  value = '',
}: TResponsesCardItemList) => {
  return (
    <FlexWrapper mBottom={'14px'} justify={'space-between'}>
      <FlexWrapper width={'auto'}>
        <Styled.Dot />
        <MRegular mLeft={'16px'} color={EColors.grey_500}>
          {title}
        </MRegular>
      </FlexWrapper>

      <MRegular color={EColors.grey_500}>{value}</MRegular>
    </FlexWrapper>
  )
}
