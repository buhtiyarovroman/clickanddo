import React, { forwardRef, useState } from 'react'

import { TSelectLangBottomSheetProps } from './types'
import { Container, ScrollContainer, ItemContainer } from './styled'

import { Input } from '@/shared/ui/input'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const SelectBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TSelectLangBottomSheetProps
>(
  (
    { value = '', onChange = () => {}, onClose = () => {}, languages = [] },
    ref,
  ) => {
    const { t } = useTranslation()
    const [search, setSearch] = useState('')
    const onPressItem = (newValue: string) => {
      onChange(newValue)
      onClose()
    }

    const onSearchLang = () => {
      return languages.filter(item => item.includes(search))
    }

    const currentData = search ? onSearchLang() : languages

    const renderItem = (item: string) => {
      const isActive = value === item
      return (
        <ItemContainer key={item} onPress={() => onPressItem(item)}>
          <Input.Radio checked={isActive} onChange={() => onPressItem(item)} />

          <MRegular mLeft={'16px'} color={EColors.grey_600}>
            {item}
          </MRegular>
        </ItemContainer>
      )
    }

    return (
      <BottomSheet.Base snapPoints={['80%']} ref={ref}>
        <Container>
          <Input.Search
            value={search}
            onChange={setSearch}
            label={t('search')}
          />
          <ScrollContainer>{currentData.map(renderItem)}</ScrollContainer>
        </Container>
      </BottomSheet.Base>
    )
  },
)
