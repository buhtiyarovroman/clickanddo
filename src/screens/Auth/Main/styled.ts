import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, StyledText } from '@/shared/ui/Styled/Styled'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: EColors.primary,
  },
  image: {
    width: '100%',
    height: '55%',
  },
})

export const TextContainer = styled(FlexWrapper).attrs({
  flexDirection: 'column',
})`
  padding: 0px 20px;
`

export const WelcomeText = styled(StyledText).attrs({
  color: EColors.white,
  size: '32px',
})`
  font-weight: 800;
`
