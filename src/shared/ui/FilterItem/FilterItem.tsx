import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  LSemibold,
  SRegular,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import React from 'react'
import { THomeFilterItemProps } from './types'

export const FilterItem = ({
  title = '',
  value = '',
  onPress = () => {},
}: THomeFilterItemProps) => (
  <Touchable onPress={onPress} justify={'space-between'}>
    <FlexWrapper width={'auto'} flexDirection={'column'} align={'flex-start'}>
      <SRegular color={EColors.grey_600}>{title}</SRegular>
      <LSemibold>{value}</LSemibold>
    </FlexWrapper>

    <Icon name={'AngleArrowRight'} size={24} stroke={EColors.grey_600} />
  </Touchable>
)
