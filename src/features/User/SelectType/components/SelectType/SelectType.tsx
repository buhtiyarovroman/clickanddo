import React, { forwardRef } from 'react'

import { TSelectLangBottomSheetProps } from './types'
import { Container, ItemContainer } from './styled'

import { Input } from '@/shared/ui/input'
import { FlexWrapper, MRegular, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { levelData } from '@/shared/config/langLevel'
import { TLevelData } from '@/shared/config/types'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const SelectTypeBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TSelectLangBottomSheetProps
>(({ value = '', onChange = () => {}, onClose = () => {} }, ref) => {
  const onPressItem = (newValue: number) => {
    onChange(newValue)
    onClose()
  }

  const renderItem = (item: TLevelData) => {
    const isActive = value === item.value
    return (
      <ItemContainer key={item.title} onPress={() => onPressItem(item.value)}>
        <Input.Radio
          checked={isActive}
          onChange={() => onPressItem(item.value)}
        />

        <FlexWrapper
          align={'flex-start'}
          flexDirection={'column'}
          width={'auto'}>
          <MRegular mLeft={'16px'}>{item.title}</MRegular>
          <SRegular mLeft={'16px'} color={EColors.grey_600}>
            {item.description}
          </SRegular>
        </FlexWrapper>
      </ItemContainer>
    )
  }

  return (
    <BottomSheet.Base snapPoints={['80%']} ref={ref}>
      <Container>{levelData.map(renderItem)}</Container>
    </BottomSheet.Base>
  )
})
