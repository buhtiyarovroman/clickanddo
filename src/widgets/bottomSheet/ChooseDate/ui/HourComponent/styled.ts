import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN } from '@/shared/ui/utils'
import { Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { TStyledHourComponentProps } from './types'

const { width } = Dimensions.get('screen')

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledHourComponentProps>`
  width: ${width * 0.25}px;
  border: ${({ active }) => (active ? 0 : 1)}px solid ${EColors.grey_300};
  background-color: ${({ active }) =>
    active ? EColors.primary : EColors.white};

  border-radius: 7px;
  padding: 9px 0px;
  opacity: ${({ disable }) => (disable ? 0.6 : 1)}
    ${FLEX({ direction: 'column' })} ${props => MARGIN(props)};
`
