import React, { useRef } from 'react'
import { Keyboard } from 'react-native'

import { BottomSheet } from '@/widgets/bottomSheet'
import { useKeyboardMode } from '@/features/hooks'

import { MSemibold } from '@/shared/ui/Styled/Styled'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

import { EColors } from '../../Styled'

import * as S from './styled'
import { TCurrencyProps } from './types'

export const Currency = ({
  value,
  onChangeInput = () => {},
  currency = 'UAH',
  onChangeCurrency = () => {},
  error = '',
  label,
  fontSize,
  disabled = false,
  onBlur = () => {},
  inputMode,
  ...props
}: TCurrencyProps) => {
  const ref = useRef<TBottomSheetBaseRef | null>(null)

  inputMode && useKeyboardMode(inputMode)

  const onOpen = () => {
    ref.current?.open()
    Keyboard.dismiss()
  }

  const onClose = () => {
    ref.current?.close()
  }

  return (
    <>
      <S.CInput hasError={!!error} {...props}>
        <S.Input
          editable={!disabled}
          onBlur={onBlur}
          keyboardType={'numeric'}
          value={value}
          onChangeText={onChangeInput}
          placeholder={label}
          placeholderTextColor={EColors.grey_600}
          fontSize={fontSize}
          maxLength={7}
        />

        <S.BCurrency onPress={onOpen}>
          <MSemibold color={EColors.black}>{currency}</MSemibold>
        </S.BCurrency>
      </S.CInput>

      <BottomSheet.CurrencyBottomSheet
        ref={ref}
        onClose={onClose}
        currency={currency}
        onChange={onChangeCurrency}
      />
    </>
  )
}
