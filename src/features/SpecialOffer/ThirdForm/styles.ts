import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StyleSheet } from 'react-native'
import { EColors } from '@/shared/ui/Styled'

export const styles = StyleSheet.create({
  photo_card: {
    marginTop: 10,
    width: '100%',
    height: hp(25),
    borderRadius: 12,
    backgroundColor: EColors.grey_200,
    flexDirection: 'column',
  },
})
