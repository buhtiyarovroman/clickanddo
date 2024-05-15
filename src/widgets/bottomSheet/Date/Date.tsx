import React, { forwardRef } from 'react'

import { TDateBottomSheetProps } from './types'
import { Container, styles } from './styled'
import { ELanguages, i18n } from '@/app/i18n'
import DatePicker from 'react-native-date-picker'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const DateBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TDateBottomSheetProps
>(
  (
    {
      dateValue = new Date(),
      setDate = () => {},
      pickerProps,
      maximumDate,
      minimumDate,
      mode = 'date',
      locale,
    },
    ref,
  ) => {
    return (
      <BottomSheet.Base snapPoints={['40%']} ref={ref}>
        <Container>
          {/* Date picker */}
          <DatePicker
            style={styles.datePicker}
            date={dateValue}
            locale={locale || (i18n.language as ELanguages)}
            onDateChange={setDate}
            androidVariant="iosClone"
            mode={mode}
            theme={'light'}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            {...pickerProps}
          />
        </Container>
      </BottomSheet.Base>
    )
  },
)
