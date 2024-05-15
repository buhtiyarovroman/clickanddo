import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const ButtonContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  padding: 14px 0px;

  ${FLEX({ justify: 'flex-start' })}
`
