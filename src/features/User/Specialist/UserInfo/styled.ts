import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  text: {
    width: '80%',
  },
})

export const InfoContainer = styled(FlexWrapper).attrs({
  width: 'auto',
  mRight: '8px',
})``

export const AddContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 52px;
  height: 53px;
  border: 1px solid ${EColors.grey_400};
  border-radius: 12px;

  ${FLEX({})}
`
