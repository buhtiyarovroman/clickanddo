import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'

export const StyledModalContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.6);

  padding: 16px;

  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled(View)`
  padding: 16px;

  justify-content: center;
  align-items: center;

  border-radius: 8px;

  background-color: ${EColors.white};
`
