import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import styled from 'styled-components'

export const Dot = styled(FlexWrapper).attrs({
  width: '3px',
  height: '3px',
})`
  border-radius: 100px;
  background-color: ${EColors.black};
`
