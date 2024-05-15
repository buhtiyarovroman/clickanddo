import React, { useMemo, useState } from 'react'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import { TMonthCalendarProps } from './types'
import { useTheme } from 'styled-components'
import { eachDayOfInterval, format, isAfter } from 'date-fns'
import { getDays, getMonths } from './helpers'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { EColors } from '../Styled'
import { Button } from '../button'

export const MonthCalendar = ({
  value,
  onSelect,
  isPeriod = true,
  buttonTitle,
  ...props
}: TMonthCalendarProps) => {
  const { i18n } = useTranslation()

  const [selectedDate, setSelectedDate] = useState(value)

  LocaleConfig.locales[i18n.language] = {
    monthNames: getMonths('LLLL'),
    monthNamesShort: getMonths('LLL'),
    dayNames: getDays('iiii'),
    dayNamesShort: getDays('iii'),
  }

  LocaleConfig.defaultLocale = i18n.language

  const isOneDateSelected = selectedDate.from === selectedDate.till

  const interval = useMemo(
    () =>
      eachDayOfInterval({
        start: new Date(selectedDate.from),
        end: new Date(selectedDate.till),
      })
        .slice(1, -1)
        .map(val => format(val, 'yyyy-MM-dd')),
    [selectedDate],
  )

  const onChange = (day: DateData) => {
    const newDate = day.dateString

    if (!isPeriod) {
      setSelectedDate({
        from: newDate,
        till: newDate,
      })
      return
    }

    if (isOneDateSelected) {
      if (isAfter(new Date(newDate), new Date(selectedDate.from))) {
        setSelectedDate({
          from: selectedDate.from,
          till: newDate,
        })
        return
      }

      setSelectedDate({
        from: newDate,
        till: selectedDate.till,
      })
      return
    }

    setSelectedDate({
      from: newDate,
      till: newDate,
    })
  }

  const onSubmit = () => {
    onSelect(selectedDate)
  }

  return (
    <>
      <Calendar
        // Specify the current date
        current={selectedDate.till}
        // Callback that gets called when the user selects a day
        onDayPress={onChange}
        markingType={'period'}
        // Mark specific dates as marked
        markedDates={{
          [selectedDate.from]: {
            color: EColors.primary,
            textColor: EColors.white,
          },

          ...interval.reduce((store, val) => {
            return {
              ...store,
              [val]: {
                color: EColors.grey_600 + '25',
                textColor: EColors.black,
              },
            }
          }, {}),

          [selectedDate.till]: {
            color: EColors.primary,
            textColor: EColors.white,
          },
        }}
        theme={{
          backgroundColor: EColors.white,
          calendarBackground: EColors.white,
          selectedDayTextColor: EColors.white,
          textDisabledColor: EColors.black,
          dayTextColor: EColors.black,
          arrowColor: EColors.black,
          monthTextColor: EColors.black,
        }}
        {...props}
      />

      <Button.Standard
        mTop={'16px'}
        text={t('date_value.select')}
        onPress={onSubmit}
      />
    </>
  )
}
