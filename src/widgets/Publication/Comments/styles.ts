import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
export const styles = StyleSheet.create({
  comments: {
    paddingVertical: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
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
  my_avatar: {
    borderRadius: 40,
    overflow: 'hidden',
    width: 39,
    height: 39,
    marginTop: 3,
  },
  button_wrapper: {
    height: 39,
    width: 39,
    borderRadius: 40,
    backgroundColor: EColors.primary,
    marginLeft: 10,
    marginTop: 3,
  },
  button_icon: {
    marginLeft: 3,
  },
})

export const TouchableMore = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  ${FLEX({})};
`
