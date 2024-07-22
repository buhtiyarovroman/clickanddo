import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'

import {
  getDatesArray,
  getHoursArray,
  isValidTime,
  areDatesEqual,
  areHoursEqual,
} from '../../helpers'
import { FlatList, ListRenderItem } from 'react-native'
import { isToday } from 'date-fns'
import { styles } from './styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { HourComponent } from '../HourComponent'
import { DateComponent } from '../DateComponent'
import { TSelectDatesRef, TSelectedDatesProps } from './types'

export const DatesForm = forwardRef<TSelectDatesRef, TSelectedDatesProps>(
  ({ onChangeValid = () => {} }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedHours, setSelectedHours] = useState<Date | undefined>()

    const dates = getDatesArray()

    const hours = getHoursArray()

    useImperativeHandle(ref, () => ({
      getForm: () => {
        if (!selectedDate || !selectedHours) {
          console.log('ERROR: no selected date onSendResponse')
          return null
        }
        return { selectedDate, selectedHours }
      },
    }))

    useEffect(() => {
      onChangeValid(!!selectedDate && !!selectedHours)
    }, [selectedDate, selectedHours])

    useEffect(() => {
      if (selectedHours && selectedDate) {
        if (isToday(selectedDate) && !isValidTime(selectedHours)) {
          setSelectedHours(new Date())
        }
      }
    }, [selectedDate])

    const renderDates: ListRenderItem<Date> = ({ item }) => {
      const active = selectedDate ? areDatesEqual(selectedDate, item) : false

      return (
        <DateComponent
          active={active}
          mRight={'16px'}
          date={item}
          onSelect={setSelectedDate}
        />
      )
    }

    const renderHours: ListRenderItem<Date> = ({ item }) => {
      const isActive = selectedHours
        ? areHoursEqual(selectedHours, item)
        : false
      const today = selectedDate ? isToday(selectedDate) : false
      return (
        <HourComponent
          active={isActive}
          date={item}
          mBottom={'10px'}
          disable={today ? !isValidTime(item) : false}
          onSelect={setSelectedHours}
        />
      )
    }
    return (
      <>
        {/* Dates List */}
        <FlatList
          style={styles.main}
          data={dates}
          keyExtractor={item => item.toString()}
          renderItem={renderDates}
          horizontal
        />

        {/* Hours table */}
        <FlexWrapper mBottom={'16px'}>
          <FlatList
            data={hours}
            numColumns={3}
            style={styles.styleColumn}
            columnWrapperStyle={styles.column}
            keyExtractor={item => item.toString()}
            renderItem={renderHours}
            scrollEnabled={false}
          />
        </FlexWrapper>
      </>
    )
  },
)
