import { View, TouchableOpacity, TextInput } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { MARGIN, TMargin } from '../../utils'
import { FlexWrapper } from '../../Styled/Styled'

export const Container = styled(View)`
  flex-direction: row;
  padding: 10px 5px;
  background-color: ${EColors.white};
  align-items: flex-end;
  padding-bottom: 10px;
  border-radius: 12px;
  /* max-height: 130px; */
`

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 4px;
  margin-bottom: 5px;
`

export const CInput = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  overflow: hidden;
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

export const Send = styled(TouchableOpacity).attrs({
  activeOpacity: 0.5,
})`
  margin-bottom: 2.5px;
`

export const SendContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ background: EColors } & TMargin>`
  padding: 10px;
  background-color: ${({ background }) => background};
  border-radius: 12px;

  ${props => MARGIN(props)}
`

export const ImageContainer = styled(FlexWrapper).attrs({
  justify: 'space-between',
})`
  background-color: ${EColors.white};
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 5px;
`
