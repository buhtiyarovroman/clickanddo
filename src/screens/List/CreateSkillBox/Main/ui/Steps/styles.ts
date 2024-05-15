import { StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/Styled'

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    width: '100%',
  },
  list: {
    marginTop: 10,
    width: '100%',
  },
  item: {
    backgroundColor: EColors.grey_800,
    borderRadius: 40,
    height: 32,
    width: 32,
    marginLeft: 6,
  },
  text_wrapper: {
    paddingRight: 20,
    paddingTop: 5,
    marginLeft: 10,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})
