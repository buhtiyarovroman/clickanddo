import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const ProfileTouchable = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  margin-bottom: 10px;
  ${FLEX({})}
`

export const UserImage = styled(Image.Standard).attrs({
  borderRadius: 8,

  type: 'user',
})`
  width: 38px;
  height: 38px;
`
