import React, { useRef } from 'react'
import { TCountryProps } from './types'
import { BottomSheet } from '@/widgets/bottomSheet'
import { EColors, Styled } from '../../Styled'
import { Container, InputContainer, StyledTextInputContainer } from './styled'
import { Icon } from '../../Icon'
import { format } from 'date-fns'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const Country = ({
  label = '',
  value,
  height = '56px',
  width = '100%',
  disabled = false,
  error,
  pickerProps,
  ...props
}: TCountryProps) => {
  const modalRef = useRef<TBottomSheetBaseRef | null>(null)

  const isValue = !!value

  const CurrentLabel = isValue ? Styled.SMedium : Styled.LRegular

  const onOpenModal = () => {
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
          <InputContainer isFocused={isValue}>
            {!!label && (
              <CurrentLabel
                mBottom={'5px'}
                mTop={'3px'}
                color={EColors.grey_600}>
                {label}
              </CurrentLabel>
            )}
            {value && <Styled.LMedium>{value}</Styled.LMedium>}
          </InputContainer>

          {/* Right icon */}
          <Icon name={'Calendar'} size={18} />
        </StyledTextInputContainer>
      </Container>

      <BottomSheet.DateBottomSheet
        ref={modalRef}
        dateValue={date}
        setDate={setDate}
        pickerProps={pickerProps}
      />
    </>
  )
}
