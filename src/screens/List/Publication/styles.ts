import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content_container: {
    paddingHorizontal: 20,
    backgroundColor: EColors.white,
  },

  title: {
    width: '100%',
    textAlign: 'center',
  },

  list_wrapper: {
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})
