import { StyleSheet, TextInput } from 'react-native'

import styled from 'styled-components'
import { FONT } from '../../utils'
import { EColors } from '../../Styled'

export const StyledTextArea = styled(TextInput)<{ error: boolean }>`
  border-radius: 12px;
  background-color: ${EColors.grey_200};
  width: 100%;
  border: 1px solid
    ${({ error }) => (error ? EColors.error : EColors.transparent)};
  padding: 12px 12px;
  ${FONT({ color: EColors.black })};
`

export const styles = StyleSheet.create({
  textArea: {
    textAlignVertical: 'top',
  },
})
