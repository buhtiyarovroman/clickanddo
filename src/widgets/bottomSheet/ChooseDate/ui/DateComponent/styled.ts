import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { TStyledDateComponentsProps } from './types'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledDateComponentsProps>`
  background-color: ${({ active }) =>
    active ? EColors.primary : EColors.grey_200};

  border-radius: 7px;
  padding: 9px 15px;
  ${FLEX({ direction: 'column' })}

  ${props => MARGIN(props)}
`
