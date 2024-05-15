import React, { useRef } from 'react'
import { TTouchableDatePickerProps } from './types'
import { BottomSheet } from '@/widgets/bottomSheet'
import { Keyboard } from 'react-native'
import { Input } from '@/shared/ui/input'
import { format } from 'date-fns'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const TouchableDatePicker = ({
  label = '',
  date,
  setDate = () => {},
  error,
  disabled = false,
  pickerProps,
  width = '100%',
  ...props
}: TTouchableDatePickerProps) => {
  const modalRef = useRef<TBottomSheetBaseRef | null>(null)

  const onOpenModal = () => {
    Keyboard.dismiss()
    if (!disabled) {
      modalRef.current?.open()
    }
  }

  return (
    <>
      <Input.Touchable
        width={width}
        label={label}
        value={date ? format(new Date(date), 'dd.MM.yyyy') : ''}
        onPress={onOpenModal}
        mBottom={'16px'}
        disabled={disabled}
        error={error}
      />

      <BottomSheet.DateBottomSheet
        ref={modalRef}
        dateValue={!!date ? new Date(date) : undefined}
        setDate={newDate => setDate(newDate.toISOString())}
        pickerProps={pickerProps}
        {...props}
      />
    </>
  )
}
