import { EColors } from '@/shared/ui/Styled'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  toastContainer: {
    paddingHorizontal: 15,
  },
  errorToast: {
    borderLeftColor: EColors.error,
    padding: 10,
    height: 'auto',
    backgroundColor: EColors.white,
  },
  successToast: {
    borderLeftColor: EColors.primary,
    padding: 10,
    height: 'auto',
    backgroundColor: EColors.white,
  },
  text1: {
    fontSize: RFValue(18, height),
    color: EColors.black,
  },
  text2: {
    fontSize: RFValue(16, height),
    marginTop: 5,
    color: EColors.grey_600,
  },
})
