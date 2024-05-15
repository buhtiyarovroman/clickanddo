import React, { forwardRef, useContext, useEffect, useState } from 'react'

import { TChooseDateBottomSheetProps } from './types'
import { Container, styles } from './styled'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import {
  getDatesArray,
  getHoursArray,
  isValidTime,
  areDatesEqual,
  areHoursEqual,
  transformPublicationToProject,
} from './helpers'
import { FlatList, ListRenderItem } from 'react-native'
import * as UI from './ui'
import { isToday } from 'date-fns'
import { Button } from '@/shared/ui/button'
import { useTranslation } from 'react-i18next'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { ProjectsService } from '@/entities/Projects/services'
import { LoaderContext } from '@/app/contexts/Loader'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import {
  getPublicationSelector,
  publicationActions,
} from '@/entities/Publication'
import { useTypedSelector } from '@/app/store'
import { v4 as uuidv4 } from 'uuid'

export const ChooseDateBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TChooseDateBottomSheetProps
>(({ publication, onClose = () => {}, onRefresh = () => {} }, ref) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { singlePublication } = useTypedSelector(getPublicationSelector)
  const { setLoading } = useContext(LoaderContext)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedHours, setSelectedHours] = useState<Date | undefined>()

  const dates = getDatesArray()

  const hours = getHoursArray()

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
      <UI.DateComponent
        active={active}
        mRight={'16px'}
        date={item}
        onSelect={setSelectedDate}
      />
    )
  }

  const renderHours: ListRenderItem<Date> = ({ item }) => {
    const isActive = selectedHours ? areHoursEqual(selectedHours, item) : false
    const today = selectedDate ? isToday(selectedDate) : false
    return (
      <UI.HourComponent
        active={isActive}
        date={item}
        mBottom={'10px'}
        disable={today ? !isValidTime(item) : false}
        onSelect={setSelectedHours}
      />
    )
  }

  const onSendResponse = async () => {
    if (!publication) {
      console.log('ERROR: no have publication in onSendResponse')
      return
    }

    if (!selectedDate && !selectedHours) {
      console.log('ERROR: no selected date onSendResponse')

      return
    }
    try {
      setLoading(true)
      const data = await transformPublicationToProject(
        publication,
        selectedDate!,
        selectedHours!,
      )

      await ProjectsService.postProject(data)

      dispatch(
        publicationActions.setState({
          singlePublication: { ...publication, userProject: uuidv4() },
        }),
      )

      Toast.show({
        type: 'success',
        text2: 'toasts.publication_responses',
      })

      onClose()
      onRefresh()
      setSelectedDate(undefined)
      setSelectedHours(undefined)
    } catch (error) {
      console.log('onSendResponse error =>', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BottomSheet.Base snapPoints={[]} enableDynamicSizing ref={ref}>
      <BottomSheetView>
        <Container>
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

          <FlexWrapper mBottom={'24px'}>
            <Button.Standard
              disabled={!selectedDate || !selectedHours}
              text={t('sign_up')}
              onPress={onSendResponse}
            />
          </FlexWrapper>
        </Container>
      </BottomSheetView>
    </BottomSheet.Base>
  )
})
