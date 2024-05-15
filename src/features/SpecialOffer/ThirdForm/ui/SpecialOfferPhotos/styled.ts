import { Image } from '@/shared/ui/image'
import { EColors } from '@/shared/ui/Styled'
import { Touchable } from '@/shared/ui/Styled/Styled'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const EmptyPhoto = styled(Touchable).attrs({
  mBottom: '8px',
})`
  width: 106px;
  height: 134px;
  border: 2px dashed #00000026;
  border-radius: 14px;
`

export const PlusContainer = styled(View)`
  padding: 8px;
  border-radius: 100px;
  background-color: #0000000d;
`

export const SpecialOffersPhoto = styled(Image.Standard)`
  width: 106px;
  height: 134px;
  border-radius: 14px;
`

export const ImageDelete = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  z-index: 1000;
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 100px;
  background-color: ${EColors.white};
  padding: 8px;
`
