import { EColors } from '@/shared/ui/Styled'
import { StyleSheet, TextInput, View } from 'react-native'
import styled from 'styled-components'

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

export const InputContainer = styled(View)`
  width: 70%;
  background-color: ${EColors.grey_200};
  min-height: 44px;
  border-radius: 12px;
  padding: 10px;
`
export const Input = styled(TextInput).attrs({
  underlineColorAndroid: EColors.transparent,
  placeholderTextColor: EColors.grey_600,
  selectionColor: EColors.grey_600,
  returnKeyType: 'done',
  multiline: true,
  textAlignVertical: 'center',
})`
  flex: 1;
  color: ${EColors.black};
  font-size: 15px;
  max-height: 110px;
  padding: 0;
`
