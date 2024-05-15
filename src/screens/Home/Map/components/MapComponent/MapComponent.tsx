import React, { forwardRef, useCallback } from 'react'
import MapView from 'react-native-map-clustering'
import { styles } from './styled'
import { Platform } from 'react-native'
import {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps'
import { EColors } from '@/shared/ui/Styled'
import _ from 'lodash'
import { TMapComponentProps } from './types'
import { TUser } from '@/entities/User/models'
import { TProject } from '@/entities/Projects/models'
import { Icon } from '@/shared/ui/Icon'
import { Svg } from '@assets/Svg'
import NativeMap from 'react-native-maps'

const Provider = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT

const initialRegion = {
  latitude: 52.510605,
  longitude: 13.402759,
  latitudeDelta: 0.1022,
  longitudeDelta: 0.1021,
}

export const MapComponent = forwardRef<NativeMap, TMapComponentProps>(
  (
    {
      setCenter = () => {},
      data = [],
      currentIndex = 0,
      setCurrentIndex = () => {},
      myPosition,
    },
    ref,
  ) => {
    const calculateVisibleRadius = (latitudeDelta: number) => {
      const oneDegreeOfLatitudeInMeters = 111000 // Примерное расстояние в метрах для одного градуса широты
      return (latitudeDelta / 2) * oneDegreeOfLatitudeInMeters // Радиус в метрах
    }

    const onRegionChange = useCallback(
      _.debounce((region: Region) => {
        const visibleRadius = calculateVisibleRadius(region.latitudeDelta)
        setCenter({
          radius: visibleRadius,
          latitude: region.latitude,
          longitude: region.longitude,
        })
      }, 300),
      [],
    )

    const renderMarkers = useCallback(
      (item: TUser | TProject, index: number) => {
        const CurrentColor =
          index === currentIndex ? EColors.primary : EColors.white
        if ('dateOfBirth' in item) {
          let user: TUser = item

          return (
            <Marker
              key={user._id}
              onPress={() => setCurrentIndex(index)}
              coordinate={{
                latitude: user.location.coordinates[1]!,
                longitude: user.location.coordinates[0]!,
              }}>
              <Svg.MapPin fill1={CurrentColor} />
            </Marker>
          )
        } else if ('relevantUntil' in item) {
          let project: TProject = item

          return (
            <Marker
              key={project._id}
              onPress={() => setCurrentIndex(index)}
              coordinate={{
                latitude: project.location.coordinates[1],
                longitude: project.location.coordinates[0],
              }}>
              <Svg.MapPin fill1={CurrentColor} />
            </Marker>
          )
        }
      },
      [currentIndex, setCurrentIndex],
    )

    return (
      <MapView
        ref={ref}
        style={styles.main}
        toolbarEnabled={false}
        provider={Provider}
        clusterColor={EColors.black}
        userInterfaceStyle={'light'}
        onRegionChange={onRegionChange}
        initialRegion={initialRegion}>
        {/* {center && (
          <Circle
            center={{
              longitude: center.longitude,
              latitude: center.latitude,
            }}
            radius={center.radius}
            fillColor="red"
          />
        )} */}
        {myPosition && myPosition?.latitude && myPosition?.longitude && (
          <Marker coordinate={myPosition}>
            <Icon size={30} name={'MapPinUserMy'} />
          </Marker>
        )}

        {data.map(renderMarkers)}
      </MapView>
    )
  },
)
