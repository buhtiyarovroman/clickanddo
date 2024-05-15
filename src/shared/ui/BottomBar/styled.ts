import { Platform, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../Styled'
import { FLEX } from '../utils'

export const ContentContainer = styled(View)<{ bottomInst: number }>`
  width: 100%;
  padding: 8px 16px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  background-color: ${EColors.white};
  position: absolute;
  bottom: 0;
  padding-bottom: ${({ bottomInst }) =>
    Platform.OS === 'android' ? bottomInst + 16 + 'px' : bottomInst + 'px'};
  ${FLEX({ direction: 'row', align: 'center', justify: 'space-between' })}
`
