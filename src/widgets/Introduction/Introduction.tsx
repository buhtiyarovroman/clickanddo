import { EColors, Styled } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import React from 'react'

export const Introduction = () => {
  return (
    <Styled.FlexWrapper
      flexDirection={'column'}
      justify={'flex-start'}
      height={'100%'}>
      <Styled.H1>H1</Styled.H1>
      <Styled.H2>H1</Styled.H2>

      <Styled.Hr mBottom={'20px'} />

      <Input.Standard
        label={'Input with require'}
        placeholder={'placeholder'}
        mBottom={'16px'}
      />

      <Input.Standard
        label={'Input with error'}
        notRequired
        placeholder={'placeholder'}
        error={'Error'}
      />

      {/* <Button.Standard text={'Button'} />

      <Button.Standard
        mTop={'16px'}
        width={'50%'}
        textColor={EColors.black}
        text={'Button 50%, and color'}
      />

      <Button.Standard mTop={'16px'}>
        <Styled.H2 color={EColors.white}>Button H1 text</Styled.H2>
      </Button.Standard>

      <Button.Standard
        iconProps={{
          fill: EColors.white,
        }}
        mTop={'16px'}
        icon={'Index'}
        text={'Button with icon'}
      /> */}
    </Styled.FlexWrapper>
  )
}
