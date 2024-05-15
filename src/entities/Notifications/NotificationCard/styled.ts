import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})<TMargin>`
  width: 100%;

  background-color: ${EColors.white};
  ${props => MARGIN(props)};
  padding: 10px 0px;

  ${FLEX({ justify: 'space-between', align: 'flex-start' })}
`

export const UserImage = styled(Image.Standard)`
  border-radius: 100px;
  width: 50px;
  height: 50px;
`

export const OtherImage = styled(Image.Standard)`
  border-radius: 6px;
  width: 40px;
  height: 40px;
`

export const Dot = styled(View)`
  background-color: ${EColors.error_D1};
  width: 10px;
  height: 10px;
  border-radius: 100px;
`

export const styles = StyleSheet.create({
  message: {
    width: '90%',
  },
})
