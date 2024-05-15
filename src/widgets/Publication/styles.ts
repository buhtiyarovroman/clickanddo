import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    borderBottomColor: EColors.grey_300,
    borderBottomWidth: 1,
  },
  section_info: {
    paddingVertical: 20,
    borderBottomColor: EColors.grey_300,
    borderBottomWidth: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  section_borderless: {
    paddingVertical: 20,
  },
  description: {
    width: '90%',
  },
  category: {
    borderRadius: 12,
    backgroundColor: EColors.info_D1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: 'auto',
    marginTop: 12,
  },
  text_line_through: {
    textDecorationLine: 'line-through',
  },
  photo_wrapper: {
    overflow: 'hidden',
    borderRadius: 40,
    height: 44,
    width: 44,
  },
  name_subscribers: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  small_button: {
    backgroundColor: EColors.grey_200,
    borderRadius: 40,
    width: 44,
    height: 44,
  },
  favorites_button: {
    width: 155,
    height: 44,
    borderRadius: 20,
  },
  name_touchable: {
    flexDirection: 'row',
    height: 44,
    width: '30%',
  },
})
