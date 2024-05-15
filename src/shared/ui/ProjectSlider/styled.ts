import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { Dimensions, View } from 'react-native'
import styled from 'styled-components'

const { width: viewportWidth } = Dimensions.get('window')

export const StyledImage = styled(Image.Standard)`
  height: 300px;
  width: ${viewportWidth}px;
`

export const PaginationContainer = styled(View)`
  width: 100%;
  position: absolute;
  align-self: center;
  bottom: 50px;
  z-index: 100000;
`

export const Bottom = styled(View)`
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  border-top-right-radius: 100px;
  border-top-left-radius: 100px;
  z-index: 1000;
  background-color: ${EColors.white};
`
