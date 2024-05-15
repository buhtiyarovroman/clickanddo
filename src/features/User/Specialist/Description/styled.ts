import { EColors } from '@/shared/ui/Styled'
import { FONT } from '@/shared/ui/utils'
import { StyleSheet, TextInput, View } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
})

export const StyledInput = styled(TextInput)`
  border: 1px solid ${EColors.grey_500};
  padding: 10px 5px;
  border-radius: 8px;
  ${FONT({ color: EColors.grey_600, size: '14px' })};
`

export const ShowMoreTextContainer = styled(View)`
  width: 85%;
`
