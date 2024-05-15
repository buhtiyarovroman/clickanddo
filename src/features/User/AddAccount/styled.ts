import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const TouchContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  padding: 8px 0px;
  ${FLEX({ justify: 'flex-start' })}
`
