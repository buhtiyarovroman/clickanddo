import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const Touchable = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
  width: 100%;
  margin-bottom: 16px;
  ${FLEX({ justify: 'flex-start' })};
`
