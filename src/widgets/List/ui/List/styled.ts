import { Background } from '@/shared/ui/background'
import { FLEX } from '@/shared/ui/utils'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(Background.Standard)`
  padding-top: 20px;
`

export const ButtonContainer = styled(View)<{
  bottomInst: number
}>`
  z-index: 10;
  width: 100%;
  position: absolute;
  bottom: ${({ bottomInst }) => TAB_HEIGHT * 2.1 + (bottomInst * 2 || 16)}px;
  ${FLEX({ direction: 'row', align: 'center', justify: 'center' })}
`

export const styles = StyleSheet.create({
  contentContainer: { justifyContent: 'space-between' },
})
