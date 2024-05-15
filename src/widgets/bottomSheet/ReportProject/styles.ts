import { Background } from '@/shared/ui/background'
import styled from 'styled-components'

export const Container = styled(Background.Scroll).attrs({
  extraScrollHeight: 0,
  contentContainerStyle: {
    justifyContent: 'flex-end',
  },
})`
  padding: 20px;
  width: 100%;
`
