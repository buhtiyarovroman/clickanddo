import { RefObject } from 'react'
import { ViewStyle } from 'react-native'
import { Point } from 'react-native-google-places-autocomplete'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

import { TIconsKeys } from '@assets/Svg'

export type TGooglePlacesValue = {
  location: { coordinates: [number, number]; type: string }
  country: string
}

export type TGooglePlaces = {
  value?: string
  onSelect?: (data: string, coordinates: Point | undefined) => void
  label?: string
  error?: string
  notRequired?: boolean
  onFocus?: () => void
  disabled?: boolean
  autoGeolocation?: boolean
  listViewStyles?: ViewStyle
  bottomSheetRef?: RefObject<BottomSheetModalMethods>
  leftIcon?: TIconsKeys
  disableFormatted?: boolean
  isBottomSheet?: boolean
  showClear?: boolean
}
