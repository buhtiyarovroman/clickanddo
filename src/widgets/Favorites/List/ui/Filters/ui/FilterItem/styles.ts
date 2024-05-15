import { EColors } from '@/shared/ui/Styled'
import { Touchable } from '@/shared/ui/Styled/Styled'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  filter_item: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: EColors.grey_200,
    borderRadius: 7,
    width: 'auto',
  },
})

export const Container = styled(Touchable)<{
  isActive: boolean
  isFirst: boolean
}>`
  padding: 9px 16px;
  background-color: ${({ isActive }) =>
    isActive ? EColors.grey_800 : EColors.grey_200};
  border-radius: 7px;
  width: auto;
  margin-right: ${({ isFirst }) => (isFirst ? '8px' : '0px')};
`
