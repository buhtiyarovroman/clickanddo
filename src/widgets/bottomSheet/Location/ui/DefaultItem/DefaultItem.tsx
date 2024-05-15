import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  LMedium,
  MMedium,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import React from 'react'
import { TDefaultListItemProps } from './types'
import { Container } from './styled'

export const DefaultItem = ({
  item,
  onPress = () => {},
}: TDefaultListItemProps) => {
  return (
    <Container onPress={onPress} justify={'space-between'}>
      <FlexWrapper width={'auto'}>
        {!!item.icon && <Icon name={item.icon} size={20} />}
        {!item.icon && <FlexWrapper width={'20px'} height={'20px'} />}

        <LMedium mLeft={'6px'}>{item.title}</LMedium>
      </FlexWrapper>

      {item.visibleRadius && (
        <MMedium color={EColors.grey_500}>{item.visibleRadius}</MMedium>
      )}
    </Container>
  )
}
