import { EColors } from '@/shared/ui/Styled'
import { StyleSheet, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styled from 'styled-components'

export const Container = styled(View)`
  padding: 20px;
  width: 100%;
`

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  list: {
    height: hp(54),
  },
  item: {
    paddingVertical: 15,
    width: '100%',
    borderBottomColor: EColors.grey_200,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
  },
})
