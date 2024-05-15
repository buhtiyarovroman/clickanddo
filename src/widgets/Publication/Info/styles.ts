import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import styled from 'styled-components'
export const HashtagItem = styled(FlexWrapper)`
  margin-right: 4px;
  margin-bottom: 6px;
  width: auto;
  padding: 6px 8px;
  border-radius: 24px;
  background-color: ${EColors.primary};
`

export const StyledPrice = styled(MRegular)`
  width: 60%;
  text-align: right;
`
