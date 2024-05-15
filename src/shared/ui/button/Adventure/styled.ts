import { Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { EColors } from '../../Styled'
import { FLEX } from '../../utils'

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  width: ${wp(90)};
  align-self: center;
  flex-direction: row;
  border-radius: 20px;
  align-items: center;
  background-color: ${EColors.grey_200};
  margin: 12px 0px;
`

export const CIcon = styled(View)`
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${EColors.white};
  margin-right: 12px;
`

export const CCount = styled(View)`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border-width: 1.5px;
  border-color: ${EColors.white};
  background-color: ${EColors.error};
  ${FLEX({})}
`

export const Count = styled(Text)`
  font-size: 8px;
  line-height: 10px;
  color: ${EColors.white};
  font-family: 'Gilroy-Medium';
`

export const CArrow = styled(View)`
  margin-left: auto;
  margin-right: 10px;
`
