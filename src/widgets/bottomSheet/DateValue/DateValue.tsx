import React, { forwardRef, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { FlexWrapper, H3SemiBold, Hr } from '@/shared/ui/Styled/Styled'

import * as S from './styled'
import * as UI from './ui'
import { EDateValue, TDateValue, TDateValueBottomSheetProps } from './types'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import {
  getCurrentWeekDates,
  getCurrentMonthDates,
  getCurrentEverythingDayBefore,
  getCurrentDate,
} from './helpers'
import { Calendar } from '../Calendar'
import { TCalendarValue } from '@/shared/ui/MonthCalendar/types'
import { parse } from 'date-fns'

export const DateValue = forwardRef<
  TBottomSheetBaseRef,
  TDateValueBottomSheetProps
>(
  (
    {
      onClose = () => {},
      value,
      setValue = () => {},
      title = '',
      isCreatedData = false,
    },
    ref,
  ) => {
    const calendarRef = useRef<TBottomSheetBaseRef | null>(null)
    const array = [
      EDateValue.anyDate,
      EDateValue.today,
      isCreatedData ? EDateValue.yesterday : EDateValue.tomorrow,
      EDateValue.thisWeek,
      EDateValue.thisMonth,
      EDateValue.everythingDayBefore,
      EDateValue.select,
    ]
    const { t } = useTranslation()

    const onSelect = (value: EDateValue) => {
      let params: TDateValue = {
        type: value,
      }

      if (value === EDateValue.today) {
        params = {
          ...params,
          dates: getCurrentDate(false, true),
        }
      }

      if (value === EDateValue.thisWeek) {
        params = {
          ...params,
          dates: getCurrentWeekDates(),
        }
      }

      if (value === EDateValue.thisMonth) {
        params = {
          ...params,
          dates: getCurrentMonthDates(),
        }
      }

      if ([EDateValue.tomorrow, EDateValue.yesterday].includes(value)) {
        params = {
          ...params,
          dates: getCurrentDate(isCreatedData),
        }
      }

      if (value === EDateValue.everythingDayBefore) {
        params = {
          ...params,
          dates: getCurrentEverythingDayBefore(isCreatedData),
        }
      }

      if (value === EDateValue.select) {
        calendarRef.current?.open()

        onClose()

        return
      }

      setValue(params)

      onClose()
    }

    const renderItem = (item: EDateValue) => {
      const isSelected = value?.type === item
      return (
        <UI.ValueItem type={item} isSelected={isSelected} onPress={onSelect} />
      )
    }

    const _onSelectData = (value: TCalendarValue) => {
      calendarRef.current?.close()
      ref.current?.close()

      console.log('value data =>', value)

      console.log('adfsa')
      setValue({
        type: EDateValue.select,
        dates: {
          start: new Date(value.from),
          end: new Date(value.till),
        },
      })
    }

    return (
      <>
        <BottomSheet.Base snapPoints={['']} enableDynamicSizing ref={ref}>
          <S.Container>
            <FlexWrapper>
              <S.Absolute onPress={onClose}>
                <Icon name={'AngleArrowLeft'} stroke={EColors.black} />
              </S.Absolute>
              <H3SemiBold>{title}</H3SemiBold>
            </FlexWrapper>

            <Hr color={EColors.grey_200} mTop={'20px'} mBottom={'20px'} />

            <S.ContentContainer>{array.map(renderItem)}</S.ContentContainer>
          </S.Container>
        </BottomSheet.Base>
        <Calendar ref={calendarRef} onSelect={_onSelectData} />
      </>
    )
  },
)
