import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  comment_item_wrapper: {
    paddingHorizontal: 25,
  },
  avatar: {
    borderRadius: 40,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  comment_text: {
    width: '70%',
    color: EColors.grey_600,
  },
})
