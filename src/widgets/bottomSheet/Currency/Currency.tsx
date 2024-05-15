import React, { forwardRef } from 'react'

import { TCurrencyBottomSheetProps, TCurrencyData } from './types'
import { Container, CurrencyContainer } from './styled'
import { useTranslation } from 'react-i18next'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const CurrencyBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TCurrencyBottomSheetProps
>(({ currency = '', onChange = () => {}, onClose = () => {} }, ref) => {
  const { t } = useTranslation()

  const currencyData: TCurrencyData[] = [
    {
      title: t('currency.uah'),
      value: 'UAH',
    },

    {
      title: t('currency.eur'),
      value: 'EUR',
    },
    {
      title: t('currency.pln'),
      value: 'PLN',
    },
    {
      title: t('currency.usd'),
      value: 'USD',
    },
  ]

  const onSelect = (value: TCurrencyData) => {
    onChange(value)
    onClose()
  }

  const renderItem = (item: TCurrencyData, index: number) => {
    const isActive = item.value === currency

    return (
      <CurrencyContainer
        key={index.toString()}
        onPress={() => onSelect(item.value)}>
        <MRegular>
          {item.title} ({item.value})
        </MRegular>

        <Input.Radio checked={isActive} onChange={() => onSelect(item.value)} />
      </CurrencyContainer>
    )
  }
  return (
    <BottomSheet.Base snapPoints={['35%']} ref={ref}>
      <Container>{currencyData.map(renderItem)}</Container>
    </BottomSheet.Base>
  )
})
