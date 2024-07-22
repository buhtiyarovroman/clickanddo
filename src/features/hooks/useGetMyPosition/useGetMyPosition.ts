import { useCallback, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import RNGeolocation from 'react-native-geolocation-service'
import { formattedAddressLocation, getFormattedAddress } from '@/shared/utils'
import Geocoder from 'react-native-geocoding'
import { useTypedSelector } from '@/app/store'
import { getUserSelector, userActions } from '@/entities/User'
import { useDispatch } from 'react-redux'

type TUseGetMyPosition = {
  disableFormatter?: boolean
}

export const useGetMyPosition = ({
  disableFormatter = false,
}: TUseGetMyPosition) => {
  const dispatch = useDispatch()
  const [coordinates, setCoordinates] =
    useState<RNGeolocation.GeoCoordinates | null>(null)
  const [formattedAddress, setFormattedAddress] = useState<string>('')

  const getPosition = () => {
    return new Promise<RNGeolocation.GeoCoordinates>((res, rej) => {
      RNGeolocation.getCurrentPosition(
        position => {
          const coords = position?.coords
          if (coords) {
            res(coords)
          }
          rej()
        },
        error => {
          rej()
        },
        {
          enableHighAccuracy: true,

          showLocationDialog: true,
        },
      )
    })
  }

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const auth = await RNGeolocation.requestAuthorization('whenInUse')

      return auth === 'granted'
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    return granted === PermissionsAndroid.RESULTS.GRANTED
  }, [])

  const getCurrentLocation = useCallback(async () => {
    try {
      const granted = await requestPermissions()

      if (granted) {
        const coords = await getPosition()

        const result = await Geocoder.from({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })

        const formatted_address = result.results?.[0]?.address_components

        let formattedLocation = ''

        if (disableFormatter) {
          formattedLocation = formattedAddressLocation(formatted_address)
        }

        if (!disableFormatter) {
          formattedLocation = getFormattedAddress(formatted_address)
        }

        if (formattedLocation) {
          dispatch(
            userActions.setState({
              userLocation: {
                longitude: coords.longitude,
                latitude: coords.latitude,
              },
            }),
          )
          setCoordinates(coords)
          setFormattedAddress(formattedLocation)

          return {
            coordinates: coords,
            formattedAddress: formattedLocation,
          }
        }

        return null
      }

      return null
    } catch {
      return null
    }
  }, [requestPermissions])

  return {
    coordinates,
    requestPermissions,
    formattedAddress,
    getCurrentLocation,
    getPosition,
  }
}
