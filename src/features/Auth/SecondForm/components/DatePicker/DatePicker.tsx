import React, { useRef } from 'react'
import { TDatePickerProps } from './types'
import { BottomSheet } from '@/widgets/bottomSheet'
import { Container, InputContainer, StyledTextInputContainer } from './styled'
import { format, subYears } from 'date-fns'
import { EColors, Styled } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { Keyboard } from 'react-native'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const DatePicker = ({
  label = '',
  date,
  setDate = () => {},
  height = '56px',
  width = '100%',
  disabled = false,
  error,
  pickerProps,
  ...props
}: TDatePickerProps) => {
  const { t } = useTranslation()
  const modalRef = useRef<TBottomSheetBaseRef | null>(null)

  const isDate = !!date

  const CurrentLabel = isDate ? Styled.SMedium : Styled.LRegular

  const onOpenModal = () => {
    Keyboard.dismiss()
    modalRef.current?.open()
  }

  return (
    <>
      <Container disabled={disabled} width={width} {...props}>
        {/* Input container*/}
        <StyledTextInputContainer
          disabled={disabled}
          onPress={onOpenModal}
          height={height}
          activeOpacity={1}
          hasError={!!error}>
          <InputContainer isFocused={isDate}>
            {!!label && (
              <CurrentLabel
                mBottom={'5px'}
                mTop={'3px'}
                color={EColors.grey_600}>
                {label}
              </CurrentLabel>
            )}
            {date && (
              <Styled.LMedium>{format(date, 'dd.MM.yyyy')}</Styled.LMedium>
            )}
          </InputContainer>

          {/* Right icon */}
          <Icon name={'Calendar'} size={18} />
        </StyledTextInputContainer>

        {error && (
          <MRegular color={EColors.error} mTop={'5px'}>
            {t(`${error}`)}
          </MRegular>
        )}
      </Container>

      <BottomSheet.DateBottomSheet
        ref={modalRef}
        dateValue={date}
        setDate={setDate}
        pickerProps={pickerProps}
        maximumDate={subYears(new Date(), 16)}
      />
    </>
  )
}
