import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
export const styles = StyleSheet.create({
  section: {
    borderTopColor: EColors.grey_200,
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 30,
  },
  section_first: {
    paddingTop: 5,
    borderTopWidth: 0,
  },
  mask: {
    position: 'absolute',
    top: 13,
    height: 60,
    width: '100%',
  },
  input_icon: {
    size: 18,
    stroke: EColors.black,
    fill: EColors.transparent,
    color: EColors.black,
  },
  photo_card: {
    marginTop: 10,
    width: '100%',
    height: hp(25),
    borderRadius: 12,
    backgroundColor: EColors.grey_200,
    flexDirection: 'column',
  },
})
