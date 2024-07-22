import { Background } from '@/shared/ui/background'
import styled from 'styled-components'
import { Platform } from 'react-native'

export const Container = styled(Background.Scroll).attrs({
  nestedScrollEnabled: true,
  keyboardShouldPersistTaps: 'handled',
  extraHeight: Platform.OS === 'android' ? 100 : 40,
})`
  padding: 12px 16px;
`
