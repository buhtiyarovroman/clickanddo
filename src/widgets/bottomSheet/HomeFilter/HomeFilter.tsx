import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  FlexWrapper,
  H3SemiBold,
  Hr,
  SRegular,
  Touchable,
} from '@/shared/ui/Styled/Styled'

import * as S from './styled'
import { THomeFilterBottomSheetProps } from './types'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { DateValue } from '../DateValue'
import { Location } from '../Location'
import { TPressAddress } from '../Location/types'
import { useDispatch } from 'react-redux'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'
import { useTypedSelector } from '@/app/store'
import { FilterItem } from '@/shared/ui/FilterItem'
import { format } from 'date-fns'
import { TDateValue } from '../DateValue/types'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'
import { getUserSelector } from '@/entities/User'

export const HomeFilter = forwardRef<
  TBottomSheetBaseRef,
  THomeFilterBottomSheetProps
>(({ onClose = () => {}, filterData }, ref) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { filterHome } = useTypedSelector(getProjectsSelector)
  const { setting } = useTypedSelector(getUserSelector)

  const dateValueRef = useRef<TBottomSheetBaseRef | null>(null)
  const relevanceValueRef = useRef<TBottomSheetBaseRef | null>(null)
  const locationValueRef = useRef<TBottomSheetBaseRef | null>(null)

  const [range, setRange] = useState<number[]>([])
  const [rangeMaxMin, setRangeMaxMin] = useState<number[]>([])
  const [location, setLocation] = useState<TPressAddress>({})
  const [publishDate, setPublishDate] = useState<TDateValue | undefined>()
  const [relevanceDate, setRelevanceDate] = useState<TDateValue | undefined>()

  useEffect(() => {
    setRangeMaxMin([filterData?.min || 0, filterData?.max || 100])

    if (!range.length) {
      setRange([0, filterData?.max || 100])
    }
  }, [filterData])

  useEffect(() => {
    if (filterHome?.max) {
      setRange([filterHome?.min || 0, filterHome?.max || 100])
    }
  }, [filterHome])

  useEffect(() => {
    setRangeMaxMin([])
  }, [setting.currency])

  const onApply = () => {
    dispatch(
      projectsActions.setState({
        filterHome: {
          ...filterHome,
          min: range[0],
          max: range[1],
          location: {
            longitude: location.lon,
            latitude: location.lat,
            radius: location.radius,
            address: location.address,
          },
          createdHb: publishDate?.dates?.start.toISOString(),
          createdLb: publishDate?.dates?.end.toISOString(),
          relevantUntilHb: relevanceDate?.dates?.end.toISOString(),
          relevantUntilLb: relevanceDate?.dates?.start.toISOString(),
        },
      }),
    )
    onClose()
  }

  const onOpenDateValue = () => {
    dateValueRef.current?.open()
  }

  const onCloseDateValue = () => {
    dateValueRef.current?.close()
  }

  const onOpenRelevance = () => {
    relevanceValueRef.current?.open()
  }

  const onCloseRelevance = () => {
    relevanceValueRef.current?.close()
  }

  const onOpenLocation = () => {
    locationValueRef.current?.open()
  }

  const onCloseLocation = () => {
    locationValueRef.current?.close()
  }

  const onGetLoc = (value: TPressAddress) => {
    setLocation(value)
  }

  const onReset = () => {
    dispatch(projectsActions.setState({ filterHome: {} }))
    setRange([0, 100])
    setRangeMaxMin([])
    setLocation({})
    setPublishDate(undefined)
    setRelevanceDate(undefined)
    onClose()
  }
  return (
    <>
      <BottomSheet.Base snapPoints={['']} enableDynamicSizing ref={ref}>
        <S.Container>
          <FlexWrapper mBottom={'25px'} justify={'space-between'}>
            <H3SemiBold>{t('sorting')}</H3SemiBold>

            <Touchable onPress={onReset} padding={10} width={'auto'}>
              <SRegular color={EColors.grey_600}>{t('reset')}</SRegular>
            </Touchable>
          </FlexWrapper>
          {/* Price Range */}

          <Input.Range
            min={0}
            max={rangeMaxMin[1] || 100}
            value={range}
            onValueChangeEnd={setRange}
          />

          <Hr color={EColors.grey_200} mTop={'16px'} mBottom={'16px'} />

          <FilterItem
            title={t('date_submission')}
            onPress={onOpenDateValue}
            value={`${
              publishDate?.dates?.start
                ? format(publishDate.dates.start, 'dd')
                : ''
            } - ${
              publishDate?.dates?.end
                ? format(publishDate.dates.end, 'dd MMMM yyyy', {
                    locale: dateLocale[i18next.language],
                  })
                : ''
            }`}
          />

          <Hr color={EColors.grey_200} mTop={'16px'} mBottom={'16px'} />

          <FilterItem
            title={t('date_relevance')}
            onPress={onOpenRelevance}
            value={`${
              relevanceDate?.dates?.start
                ? format(relevanceDate.dates.start, 'dd')
                : ''
            } - ${
              relevanceDate?.dates?.end
                ? format(relevanceDate.dates.end, 'dd MMMM yyyy', {
                    locale: dateLocale[i18next.language],
                  })
                : ''
            }`}
          />

          <Hr color={EColors.grey_200} mTop={'16px'} mBottom={'16px'} />

          <FilterItem
            title={t('location')}
            value={location.address}
            onPress={onOpenLocation}
          />

          <Button.Standard
            mTop={'64px'}
            onPress={onApply}
            color={EColors.black}
            text={t('apply')}
          />
        </S.Container>
      </BottomSheet.Base>

      <DateValue
        ref={dateValueRef}
        title={t('date_submission')}
        isCreatedData
        onClose={onCloseDateValue}
        setValue={setPublishDate}
        value={publishDate}
      />

      <DateValue
        ref={relevanceValueRef}
        title={t('date_relevance')}
        onClose={onCloseRelevance}
        value={relevanceDate}
        setValue={setRelevanceDate}
      />

      <Location
        ref={locationValueRef}
        onClose={onCloseLocation}
        onSelectAddress={onGetLoc}
      />
    </>
  )
})
