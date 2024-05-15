import { View } from 'react-native'
import styled from 'styled-components'

export const ContentContainer = styled(View)<{ isGallery: boolean }>`
  padding: 0px 20px;
  margin-top: ${({ isGallery }) => (isGallery ? '-20px' : '20px')};
`
