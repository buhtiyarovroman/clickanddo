import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

import NativeMap, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import { useIsFocused } from '@react-navigation/native'

import { Header } from '@/widgets/header'

import { useGetPublicationWithPagination } from '@/features/Publication'

import { EColors } from '@/shared/ui/Styled'
import { Background } from '@/shared/ui/background'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

import { styles } from './styled'
import { useTypedSelector } from '@/app/store'
import { getPublicationSelector } from '@/entities/Publication'
import { TPublication } from '@/entities/Publication/models'
import { Svg } from '@assets/Svg'
import * as UI from './ui'
import { getUserSelector } from '@/entities/User'
import { useGetMyPosition } from '@/features/hooks'

const PROVIDER = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT

export const Map = () => {
  const mapRef = useRef<NativeMap | null>(null)
  const bsRef = useRef<TBottomSheetBaseRef | null>(null)
  const { listFilters } = useTypedSelector(getPublicationSelector)
  const { userLocation } = useTypedSelector(getUserSelector)
  const { getCurrentLocation } = useGetMyPosition({})

  const isFocused = useIsFocused()

  const [currentPublication, setCurrentPublication] = useState<string>('')

  const { getFirstPage, publication, getMore, loadMoreLoading } =
    useGetPublicationWithPagination({
      limit: 10,
    })

  const initialRegion = {
    latitude: listFilters.latitude || userLocation?.latitude || 52.510605,
    longitude: listFilters.longitude || userLocation?.longitude || 13.402759,
    latitudeDelta: 0.1222,
    longitudeDelta: 0.1221,
  }

  const preload = async () => {
    getFirstPage()

    const coords = await getCurrentLocation()

    console.log('coords =>', !!coords)

    let navigateRegion = {
      latitude:
        listFilters.latitude ||
        coords?.coordinates.latitude ||
        userLocation?.latitude ||
        52.510605,
      longitude:
        listFilters.longitude ||
        coords?.coordinates.longitude ||
        userLocation?.longitude ||
        13.402759,
      latitudeDelta: 0.1222,
      longitudeDelta: 0.1221,
    }

    mapRef.current?.animateToRegion(navigateRegion)
  }
  useEffect(() => {
    preload()
  }, [isFocused])

  useEffect(() => {
    if (!listFilters.latitude && !listFilters.longitude) {
      mapRef.current?.animateToRegion(initialRegion)
    }
  }, [userLocation])

  const renderMarkers = useCallback(
    (item: TPublication) => {
      const CurrentColor =
        item._id === currentPublication ? EColors.primary : EColors.white

      const coordinates = item.location?.coordinates?.length
        ? {
            latitude: item.location.coordinates[1]!,
            longitude: item.location.coordinates[0]!,
          }
        : undefined

      return (
        <React.Fragment key={item._id}>
          {!!coordinates && (
            <Marker
              onPress={() => setCurrentPublication(item._id)}
              coordinate={{
                latitude: item.location.coordinates[1]!,
                longitude: item.location.coordinates[0]!,
              }}>
              <Svg.MapPin fill1={CurrentColor} />
            </Marker>
          )}
        </React.Fragment>
      )
    },
    [currentPublication],
  )

  return (
    <>
      <Header.Standard goBack title={listFilters.address} />

      <Background.Standard>
        <MapView
          ref={mapRef}
          style={styles.main}
          toolbarEnabled={false}
          provider={PROVIDER}
          clusterColor={EColors.black}
          userInterfaceStyle={'light'}
          initialRegion={initialRegion}>
          {publication.map(renderMarkers)}
        </MapView>

        <BottomSheet.View
          ref={bsRef}
          initialIndex={1}
          snapPoints={['10%', '40%', '55%', '90%']}
          hasBackdrop={false}
          withScroll
          enablePanDownToClose={false}>
          <UI.MapList
            publication={publication}
            getMore={getMore}
            loadMoreLoading={!!loadMoreLoading}
            currentPublication={currentPublication}
          />
        </BottomSheet.View>
      </Background.Standard>
    </>
  )
}
