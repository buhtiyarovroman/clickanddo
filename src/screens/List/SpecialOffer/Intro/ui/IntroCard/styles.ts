import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { EColors } from '@/shared/ui/Styled'
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: EColors.primary_D1,
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
    width: '100%',
    backgroundColor: EColors.primary_D1,
    zIndex: -1,
  },
})
