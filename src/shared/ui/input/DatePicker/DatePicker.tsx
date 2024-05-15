import React, { useRef } from 'react'
import { TDatePickerProps } from './types'
import { BottomSheet } from '@/widgets/bottomSheet'
import { EColors, Styled } from '../../Styled'
import {
  Container,
  InputContainer,
  StyledTextInputContainer,
  styles,
} from './styled'
import { Icon } from '../../Icon'
import { format } from 'date-fns'
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

  withIconLeft = false,
  ...props
}: TDatePickerProps) => {
  const modalRef = useRef<TBottomSheetBaseRef | null>(null)

  const isDate = !!date

  const CurrentLabel = isDate ? Styled.SMedium : Styled.LRegular

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
          {withIconLeft && (
            <Icon
              name={'Calendar'}
              stroke={EColors.grey_400}
              size={20}
              style={styles.left_icon}
            />
          )}
          <InputContainer isFocused={isDate}>
            <CurrentLabel mBottom={'0px'} mTop={'3px'} color={EColors.grey_600}>
              {!!label && label}
            </CurrentLabel>

            {date && (
              <Styled.LMedium mBottom={'10px'}>
                {format(date, 'dd.MM.yyyy')}
              </Styled.LMedium>
            )}
          </InputContainer>

          {/* Right icon */}
          {!withIconLeft && <Icon name={'Calendar'} size={18} />}
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
