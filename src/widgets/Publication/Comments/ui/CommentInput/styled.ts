import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button_icon: {},
  my_avatar: {
    borderRadius: 40,
    overflow: 'hidden',
    width: 39,
    height: 39,
  },
  button_wrapper: {
    height: 39,
    width: 39,
    borderRadius: 40,
    backgroundColor: EColors.primary,
    marginLeft: 10,
  },
  replayTo: {
    paddingVertical: 10,
  },
})
