import { StyleSheet } from 'react-native'
import { EColors } from '@/shared/ui/Styled'
import { EFonts } from '@/shared/ui/utils'

export const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    lineHeight: 22.4,
    textTransform: 'capitalize',
    fontFamily: EFonts.gilroy,
  },
  indicator: {
    height: 1,
    backgroundColor: EColors.primary,
  },
  tabBar: {
    backgroundColor: EColors.transparent,
  },
})
