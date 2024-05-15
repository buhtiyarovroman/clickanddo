import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { TUserImageProps } from './types'
import { Image } from '@/shared/ui/image'

export const SectionContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  width: 100%;

  ${FLEX({ justify: 'space-between' })}
  ${props => MARGIN(props)}
`

export const ProfileImage = styled(Image.Standard).attrs({ type: 'user' })<
  Pick<TUserImageProps, 'isSelected'>
>`
  width: ${({ isSelected }) => (isSelected ? 38 : 44)}px;
  height: ${({ isSelected }) => (isSelected ? 38 : 44)}px;

  border-radius: 7px;
`
