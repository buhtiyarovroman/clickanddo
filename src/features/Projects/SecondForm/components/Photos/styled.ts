import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const AddImage = styled(View).attrs({
  activeOpacity: 0.8,
})<{ isFirst: boolean }>`
  width: 72px;
  height: 72px;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${EColors.grey_200};
  ${FLEX({ direction: 'column' })}
`

export const ProjectImage = styled(Image.Standard).attrs({
  borderRadius: 12,
})`
  width: 72px;
  height: 72px;
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
