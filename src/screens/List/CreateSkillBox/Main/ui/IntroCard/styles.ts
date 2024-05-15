import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import { EColors } from '@/shared/ui/Styled'
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: EColors.success_D1,
    width: '100%',
    marginTop: 15,
    borderRadius: 24,
    overflow: 'hidden',
  },
  action_wrapper: {
    position: 'absolute',
    top: 30,
    left: 24,
    paddingRight: wp(10),
  },
  image: {
    alignSelf: 'center',
    marginTop: 200,
    height: 330,
    width: '90%',
    backgroundColor: EColors.success_D1,
    zIndex: -1,
  },
})
