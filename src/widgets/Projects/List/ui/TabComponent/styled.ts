import { EColors } from '@/shared/ui/Styled'
import { MARGIN, TMargin } from '@/shared/ui/utils'
import { View } from 'react-native'
import styled from 'styled-components'

export const MainContainer = styled(View)<TMargin>`
  width: 100%;
  background-color: ${EColors.grey_200};
  border-radius: 12px;
  padding: 5px;

  ${props => MARGIN(props)}
`

export const SecondContainer = styled(View)`
  flex-direction: row;
  background-color: ${EColors.grey_200};
  justify-content: space-around;
`
