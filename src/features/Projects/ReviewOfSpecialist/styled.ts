import { Background } from '@/shared/ui/background'
import styled from 'styled-components'

export const Container = styled(Background.Scroll).attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})`
  padding: 12px 16px;
  width: '100%';
`
