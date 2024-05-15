import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { FLEX } from '@/shared/ui/utils'

export const Touchable = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })`
  width: 100%;
  margin-bottom: 16px;
  ${FLEX({ justify: 'flex-start' })};
`
