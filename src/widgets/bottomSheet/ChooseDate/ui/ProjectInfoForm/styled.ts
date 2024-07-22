import { Background } from '@/shared/ui/background'
import styled from 'styled-components'

export const Container = styled(Background.Scroll).attrs({
  nestedScrollEnabled: true,
  keyboardShouldPersistTaps: 'handled',
  extraScrollHeight: 0,
})`
  margin-bottom: 20px;
`
