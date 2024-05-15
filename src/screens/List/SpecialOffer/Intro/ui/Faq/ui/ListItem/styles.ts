import { StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/Styled'

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
    borderBottomColor: EColors.grey_300,
    borderBottomWidth: 1,
  },
  openIcon: {
    transform: [{ rotate: '180deg' }],
  },
})
