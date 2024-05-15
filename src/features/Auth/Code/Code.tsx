import React from 'react'
import { CodeView, ResendCode } from './components'
import { TCodeLayoutsProps } from './types'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'

export const Code = (props: TCodeLayoutsProps) => {
  return (
    <FlexWrapper flexDirection={'column'} height={'100%'}>
      <CodeView {...props} />

      <ResendCode {...props} />
    </FlexWrapper>
  )
}
