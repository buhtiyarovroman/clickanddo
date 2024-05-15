import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const StyledModalContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.6);

  padding: 16px;

  justify-content: center;
  align-items: center;
`
