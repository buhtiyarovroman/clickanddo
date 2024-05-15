import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
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

export const HashTagsContainer = styled(View)`
  padding: 0px 20px;
`

export const InputContainer = styled(FlexWrapper).attrs({
  justify: 'space-between',
  mBottom: '16px',
})`
  padding: 0px 20px;
`

export const ButtonContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: ${TAB_HEIGHT + 20}px;
  padding: 0px 20px;
  left: 0px;
  z-index: 100000000;
`
