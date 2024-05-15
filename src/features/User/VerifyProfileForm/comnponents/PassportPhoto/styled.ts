import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components'

export const TouchPhoto = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  border-radius: 12px;
  padding: 28px 32px;
  width: 100%;
  height: 156px;
  background-color: ${EColors.grey_200};
  ${FLEX({ direction: 'column' })}
`

export const PopoverItem = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  ${FLEX({ justify: 'flex-start' })}
  padding: 8px 0;
`

export const AbsoluteClose = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 10px;
  border-radius: 100px;
  background-color: ${EColors.white};
  z-index: 1000;
  position: absolute;
  top: 10px;
  right: 10px;
`

export const ImagePassport = styled(Image.Standard)`
  width: 100%;
  height: 152px;
  border-radius: 12px;
`

export const styles = StyleSheet.create({
  popover: {
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  photo: {
    width: '100%',
    height: 156,
    borderRadius: 12,
  },
})
