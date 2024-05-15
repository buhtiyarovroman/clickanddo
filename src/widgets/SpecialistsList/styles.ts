import { TAB_HEIGHT } from './../BottomTab/useAnimatedTab'
import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'
import { Image } from '@/shared/ui/image'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  container: { backgroundColor: EColors.white },
  wrapper: { backgroundColor: EColors.grey_200, borderRadius: 12 },
  image: { borderRadius: 7, height: 96, width: 96 },
  iconWrapper: { position: 'absolute', top: 8, right: 15 },
  separator: { height: 20 },
  footer: { marginBottom: TAB_HEIGHT + 20 },
  listWrapper: { marginTop: 20 },
})

export const StyledImage = styled(Image.Standard)`
  border-radius: 7px;
  height: 96px;
  width: 96px;
`
