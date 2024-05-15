import { FLEX, MARGIN } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { Image } from '@/shared/ui/image'
import { TStyledContainer } from './types'

export const SectionContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledContainer>`
  width: ${({ width }) => width};
  ${FLEX({ direction: 'column' })}
  ${props => MARGIN(props)};
`

export const StyledImage = styled(Image.Standard)`
  width: 100%;
  height: 120px;

  border-radius: 12px;
`
