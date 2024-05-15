import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, StyledText } from '@/shared/ui/Styled/Styled'
import { EFonts } from '@/shared/ui/utils'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  main: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  mainContent: {
    paddingTop: '50%',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
})

export const TextContainer = styled(FlexWrapper).attrs({
  flexDirection: 'column',
})`
  padding: 0px 20px;
`

export const WelcomeText = styled(StyledText).attrs({
  color: EColors.white,
  size: '36px',
})`
  font-weight: 400;
`

export const ClockNDoText = styled(StyledText).attrs({
  color: EColors.white,
  size: '36px',
  font: EFonts.angkor,
})`
  font-weight: 700;
`
