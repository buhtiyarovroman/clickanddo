import { View } from 'react-native'
import styled, { css } from 'styled-components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'

import { EColors } from '../../Styled'

export const Container = styled(View)<{ isBottom?: boolean }>`
  padding: 16px;
  border-radius: 32px;
  background-color: ${EColors.white};
  width: ${wp(60)}px;
  align-self: center;

  ${({ isBottom }) =>
    isBottom &&
    css`
      margin-top: auto;
      margin-bottom: ${TAB_HEIGHT * 2.25}px;
    `}
`
