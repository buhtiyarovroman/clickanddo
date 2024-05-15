import { EColors } from '@/shared/ui/Styled'
import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const ChatCardContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})<{ isSeen: boolean }>`
  padding: 12px 20px;
  background-color: ${({ isSeen }) =>
    isSeen ? EColors.white : EColors.grey_200};
  border-radius: 12px ${FLEX({ justify: 'space-between' })};
`

export const ChatUserImage = styled(Image.Standard).attrs({})`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`

export const DeleteContainer = styled(TouchableOpacity)`
  background-color: ${EColors.error_L2};
  padding: 0px 16px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;

  ${FLEX({})}
`

export const styles = StyleSheet.create({
  text: {
    width: '60%',
  },
})

export const UnreadCounter = styled(View)`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  padding: 3px;
  background-color: ${EColors.primary};
  ${FLEX({})};
`

export const CounterText = styled(Text)`
  font-size: 12px;
  line-height: 13px;
  color: ${EColors.white};
`
