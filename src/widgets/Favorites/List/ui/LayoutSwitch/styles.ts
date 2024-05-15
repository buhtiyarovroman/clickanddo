import { FlexWrapper } from '@/shared/ui/Styled/Styled'

import styled from 'styled-components'

import { EColors } from '@/shared/ui/Styled/colors'

export const Container = styled(FlexWrapper)`
  width: 78px;
  padding: 3px;
  background-color: ${EColors.grey_200};
  border-radius: 12px;
  justify-content: space-between;
  align-items: center;
`
