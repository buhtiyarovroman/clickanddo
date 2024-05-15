import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  popover: {
    paddingHorizontal: 10,
    borderRadius: 12,
  },
})

export const UserImage = styled(Image.Standard).attrs({
  borderRadius: 20,

  type: 'user',
})`
  width: 96px;
  height: 96px;
`

export const PopoverItem = styled(TouchableOpacity)`
  ${FLEX({ justify: 'space-between' })}
  padding: 8px 0;
`

export const CameraView = styled(View)<{ color: EColors }>`
  position: absolute;

  bottom: -5px;
  right: -5px;
  padding: 5px;

  border-radius: 100px;
  background-color: ${({ color }) => color || EColors.primary};
  border: 3px solid ${EColors.white};
`
