import { useGetMyPosition } from '@/features/hooks'
import { uuidv4 } from '@/shared/utils'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { GeoCoordinates } from 'react-native-geolocation-service'
import { DefaultItem } from '../DefaultItem'
import { onGetData } from './data'
import { TDefaultListData, TDefaultListProps } from './types'

export const DefaultList = ({ onSelect = () => {} }: TDefaultListProps) => {
  const { t } = useTranslation()

  const { getCurrentLocation, coordinates } = useGetMyPosition({})

  const data: TDefaultListData[] = onGetData(t)

  const _onSelect = async (item: TDefaultListData) => {
    if (item.isMyLocation) {
      console.log('isMyLocation')
      let coords: GeoCoordinates | null = null

      if (coordinates) {
        console.log('isMyLocation, coordinates')

        coords = coordinates
      }

      if (!coordinates) {
        console.log('isMyLocation, !coordinates')

        const result = await getCurrentLocation()

        if (!result?.coordinates) return

        coords = result?.coordinates
      }

      if (coords) {
        console.log('isMyLocation, coords')

        onSelect({
          radius: item.radius,
          lat: coords.latitude,
          lon: coords.longitude,
          address: item.title,
          needTranslate: item.needTranslate,
        })
      }

      return
    }

    onSelect({
      radius: item.radius,
      lat: item.location?.[0],
      lon: item.location?.[1],
      address: item.title,
      needTranslate: item.needTranslate,
    })
  }

  const renderItem = useCallback(
    (item: TDefaultListData) => (
      <DefaultItem
        key={uuidv4()}
        {...{ item }}
        onPress={() => {
          _onSelect(item)
        }}
      />
    ),
    [],
  )

  return <>{data.map(renderItem)}</>
}
