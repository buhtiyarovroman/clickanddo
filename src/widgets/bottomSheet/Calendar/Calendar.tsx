import React, { forwardRef } from 'react'

import { TCalendarBBottomSheetProps } from './types'
import { Container } from './styled'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { MonthCalendar } from '@/shared/ui/MonthCalendar'

export const Calendar = forwardRef<
  TBottomSheetBaseRef,
  TCalendarBBottomSheetProps
>(
  (
    {
      value = {
        from: new Date().toString(),
        till: new Date().toString(),
      },
      onSelect = () => {},
    },
    ref,
  ) => {
    return (
      <BottomSheet.Base snapPoints={['']} enableDynamicSizing ref={ref}>
        <Container>
          {/* Dates picker */}
          <MonthCalendar onSelect={onSelect} value={value} />
        </Container>
      </BottomSheet.Base>
    )
  },
)
