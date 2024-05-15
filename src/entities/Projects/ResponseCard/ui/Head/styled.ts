import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const TouchContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 5px;
`

export const UserImage = styled(Image.Standard).attrs({
  width: '24px',
  height: '24px',
  type: 'user',
})`
  border-radius: 100px;
`

export const SpecialistContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  ${FLEX({ justify: 'flex-start' })}
`

export const styles = StyleSheet.create({
  text: {
    width: '50%',
  },
  image: {
    borderRadius: 100,
  },
})
