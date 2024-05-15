import React, { useEffect, useRef, useState } from 'react'

import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'
import { EUserRole } from '@/entities/User/models'
import { MapComponent, MapList } from './components'
import { useGetProjects } from '@/features/Projects/hooks'
import { useGetSpecialists } from '@/features/specialists'
import { getUserSelector } from '@/entities/User'
import { TCenterLocation } from './types'
import NativeMap from 'react-native-maps'
import { useGetMyPosition } from '@/features/hooks'
import { useIsFocused } from '@react-navigation/native'

export const Map = () => {
  const { filterHashtag } = useTypedSelector(getProjectsSelector)
  const { user } = useTypedSelector(getUserSelector)
  const mapRef = useRef<NativeMap | null>(null)
  const isFocused = useIsFocused()

  const isCustomer = (user?.role as EUserRole) || EUserRole.customer

  const [currentIndex, setCurrentIndex] = useState(0)

  const { getCurrentLocation, coordinates } = useGetMyPosition({})

  const useCurrent = {
    [EUserRole.customer]: useGetSpecialists,
    [EUserRole.specialist]: useGetProjects,
  }

  const [centerLocation, setCenterLocation] = useState<TCenterLocation>({
    latitude: 52.510605,
    longitude: 13.402759,
    radius: 10000,
  })

  const { data, getDataOnMap } = useCurrent[isCustomer]({
    hashtag: filterHashtag.map(item => item._id),
    location: [centerLocation.longitude, centerLocation.latitude],
    maxDistance: Math.round(centerLocation.radius),
  })

  useEffect(() => {
    getDataOnMap()
  }, [centerLocation, filterHashtag])

  const onShowMyLocation = async () => {
    const coords = await getCurrentLocation()

    let initialRegion = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.1022,
      longitudeDelta: 0.1021,
    }

    if (!coords?.coordinates) {
      initialRegion = {
        latitude: 52.510605,
        longitude: 13.402759,
        latitudeDelta: 0.1022,
        longitudeDelta: 0.1021,
      }
    }

    if (coords?.coordinates) {
      initialRegion = {
        latitude: coords.coordinates.latitude,
        longitude: coords.coordinates.longitude,
        latitudeDelta: 0.1022,
        longitudeDelta: 0.1021,
      }
    }

    mapRef.current?.animateToRegion(initialRegion, 2000)
  }

  useEffect(() => {
    if (isFocused) onShowMyLocation()
  }, [isFocused])

  return (
    <Background.SafeArea edges={['top']}>
      <Header.Map />
      <Background.Standard>
        <MapComponent
          ref={mapRef}
          center={centerLocation}
          setCenter={setCenterLocation}
          data={data}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          myPosition={{
            longitude: coordinates?.longitude,
            latitude: coordinates?.latitude,
          }}
        />
        <MapList
          data={data}
          index={currentIndex}
          setIndex={setCurrentIndex}
          onShowMyLocation={onShowMyLocation}
        />
      </Background.Standard>
    </Background.SafeArea>
  )
}
