import { EColors } from '@/shared/ui/Styled'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const Container = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 24px;
  width: 100%;
`
export const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  bottomSheetContent: {
    padding: 24,
    width: '100%',
  },
  bottomSheetBackground: { borderTopLeftRadius: 35, borderTopRightRadius: 35 },
  textWrapper: {
    width: '100%',
    marginTop: 24,
    paddingRight: 24,
    paddingBottom: 20,
    borderBottomColor: EColors.grey_200,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  handleIndicator: {
    height: 4,
    width: 81,
    backgroundColor: EColors.grey_400,
  },
  priceWrapper: {
    paddingBottom: 16,
    borderBottomColor: EColors.grey_200,
    borderBottomWidth: 1,
  },
  dropdown: { height: hp(30) },
  categoryItem: {
    paddingVertical: 10,
    borderBottomColor: EColors.grey_200,
    borderBottomWidth: 1,
  },
})
