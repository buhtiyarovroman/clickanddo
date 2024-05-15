import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const FilterContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  height: 56px;
  width: 56px;
  padding: 12px;
  background-color: ${EColors.primary};
  border-radius: 12px;
  ${FLEX({})}
`

export const SearchLinkWrapper = styled(View)`
  width: 80%;
`

export const SearchLink = styled(TouchableOpacity)`
  height: 53px;
  width: 100%;
  top: 0px;
  left: 0px;
  opacity: 0;
  background-color: ${EColors.transparent};
  z-index: 5;
`
