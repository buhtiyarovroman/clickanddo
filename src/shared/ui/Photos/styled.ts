import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
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

export const ProjectImage = styled(ImageBackground).attrs({})`
  width: 72px;
  height: 72px;
  border-radius: 12px;
`

export const ImageDelete = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: auto;
  border-radius: 100px;
  background-color: ${EColors.white};
  padding: 8px;
`

export const Container = styled(View)<TMargin>`
  width: 100%;
  ${prop => MARGIN(prop)}
`

export const styles = StyleSheet.create({
  imageBackground: {
    borderRadius: 12,
  },
  closeContainer: {
    padding: 5,
  },
})
