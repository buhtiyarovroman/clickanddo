import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen'

import { Platform } from 'react-native'

export const wp = widthPercentageToDP
export const hp = heightPercentageToDP

export const isSmallScreen = wp(100) < 380

export const isAndroid = Platform.OS === 'android'
