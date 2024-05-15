import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { ImageBackground, StyleSheet } from 'react-native'
import styled from 'styled-components'

export const ImageContainer = styled(ImageBackground)`
  background-color: ${EColors.grey_200};
  border-radius: 15px;
  height: 200px;
  overflow: hidden;
  padding: 24px;
  margin-top: 24px;

  ${FLEX({ justify: 'flex-start' })}
`

export const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    borderRadius: 5,
  },
})
