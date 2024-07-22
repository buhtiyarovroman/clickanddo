import React, { forwardRef, useEffect, useState, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@/app/store'
import { EPublicationType } from '@/entities/Publication/models'
import {
  getPublicationSelector,
  publicationActions,
} from '@/entities/Publication'

import { MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { Button } from '@/shared/ui/button'
import { Container, styles } from './styles'
import { TListProps } from './types'
import { FilterItem } from '@/shared/ui/FilterItem'
import { Location } from '../Location'
import { TPressAddress } from '../Location/types'
import { Input } from '@/shared/ui/input'
import { getUserSelector } from '@/entities/User'

export const List = forwardRef<TBottomSheetBaseRef, TListProps>(
  ({ filterData }, ref) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const { listFilters } = useTypedSelector(getPublicationSelector)
    const { setting } = useTypedSelector(getUserSelector)
    const locationValueRef = useRef<TBottomSheetBaseRef | null>(null)

    const [selectedType, setSelectedType] = useState<EPublicationType[]>([])
    const [location, setLocation] = useState<TPressAddress>({})
    const [range, setRange] = useState([
      filterData?.min || 0,
      filterData?.max || 100,
    ])

    const [rangeMaxMin, setRangeMaxMin] = useState<number[]>([])

    useEffect(() => {
      setRangeMaxMin([filterData?.min || 0, filterData?.max || 100])

      if (!range.length) {
        setRange([0, filterData?.max || 100])
      }
    }, [filterData])

    useEffect(() => {
      setSelectedType(listFilters.type || [])
      setRange([listFilters.min || 0, listFilters.max || 100])
    }, [listFilters])

    useEffect(() => {
      setRangeMaxMin([])
    }, [setting.currency])

    const onCancelPress = () => {
      ref.current?.close()
    }

    const onClearFilter = () => {
      dispatch(
        publicationActions.setState({
          listFilters: {},
        }),
      )
      setRangeMaxMin([])
      onCancelPress()
      setLocation({})
    }

    const onApplyPress = () => {
      dispatch(
        publicationActions.setState({
          listFilters: {
            type: selectedType,
            min: range[0],
            max: range[1],
            longitude: location.lon,
            latitude: location.lat,
            radius: location.radius,
            address: location.address,
            needAddressTranslate: location.needTranslate,
          },
        }),
      )

      onCancelPress()
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

    return (
      <>
        <BottomSheet.Base snapPoints={['']} enableDynamicSizing ref={ref}>
          <Container>
            {/* <Type selected={selectedType} setSelected={setSelectedType} /> */}

            <Input.Range
              min={rangeMaxMin[0] || 0}
              max={rangeMaxMin[1] || 100}
              value={range}
              onValueChangeEnd={setRange}
            />

            <FilterItem
              title={t('location')}
              value={location.address || listFilters.address}
              onPress={onOpenLocation}
            />

            <Button.Standard
              onPress={onApplyPress}
              mTop="20px"
              text={t('apply')}
            />
            <Button.Standard
              onPress={onClearFilter}
              color={EColors.white}
              style={styles.transparent_button}
              mTop="15px">
              <MRegular color={EColors.grey_700}>{t('reset')}</MRegular>
            </Button.Standard>
          </Container>
        </BottomSheet.Base>

        <Location
          ref={locationValueRef}
          onClose={onCloseLocation}
          onSelectAddress={onGetLoc}
        />
      </>
    )
  },
)
