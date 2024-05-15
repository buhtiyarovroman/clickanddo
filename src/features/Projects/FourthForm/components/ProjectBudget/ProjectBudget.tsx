import React, { useRef } from 'react'
import { TProjectBudgetProps } from './types'

import { useTranslation } from 'react-i18next'
import { MRegular, MSemibold } from '@/shared/ui/Styled/Styled'
import {
  StyledTextInputContainer,
  StyledTextInput,
  CurrencyButton,
} from './styled'
import { BottomSheet } from '@/widgets/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { Keyboard } from 'react-native'

export const ProjectBudget = ({
  value = '0',
  onChangeInput = () => {},
  currency = 'USD',
  onChangeCurrency = () => {},
  error = '',
}: TProjectBudgetProps) => {
  const ref = useRef<TBottomSheetBaseRef | null>(null)
  const { t } = useTranslation()

  const onOpen = () => {
    Keyboard.dismiss()
    ref.current?.open()
  }

  const onClose = () => {
    ref.current?.close()
  }

  return (
    <>
      <MRegular>{t('project_budget')}</MRegular>

      {/* TODO */}
      <StyledTextInputContainer hasError={!!error}>
        <StyledTextInput
          keyboardType={'number-pad'}
          value={value}
          onChangeText={onChangeInput}
        />

        <CurrencyButton onPress={onOpen}>
          <MSemibold>{currency}</MSemibold>
        </CurrencyButton>
      </StyledTextInputContainer>

      <BottomSheet.CurrencyBottomSheet
        ref={ref}
        currency={currency}
        onChange={onChangeCurrency}
        onClose={onClose}
      />
    </>
  )
}
