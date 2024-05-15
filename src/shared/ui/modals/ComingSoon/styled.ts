import { View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { FLEX } from '../../utils'

export const StyledModalView = styled(View)`
  background-color: ${EColors.white};

  padding: 16px;

  border-radius: 12px;

  ${FLEX({ direction: 'column' })}
`
