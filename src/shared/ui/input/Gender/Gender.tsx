import React from 'react'
import { Container, RadioContainer } from './styled'
import { EGender, TGender } from './types'
import { FlexWrapper } from '../../Styled/Styled'
import { Radio } from '../Radio'
import { Icon } from '../../Icon'
import { EColors, Styled } from '../../Styled'

const genderMass = [EGender.male, EGender.female, EGender.other]

export const Gender = ({
  label = '',
  width = '100%',
  value = EGender.male,
  disabled = false,
  onChange = () => {},
  ...props
}: TGender) => {
  const renderItem = (item: EGender) => {
    const isActive = item === value
    return (
      <RadioContainer onPress={() => onChange(item)} mRight={'32px'}>
        <Radio
          onChange={() => onChange(item)}
          mRight={'12px'}
          checked={isActive}
        />

        <Icon name={item} />
      </RadioContainer>
    )
  }

  return (
    <Container disabled={disabled} width={width} {...props}>
      <Styled.MRegular mBottom={'5px'} color={EColors.grey_600}>
        {label}
      </Styled.MRegular>
      <FlexWrapper justify={'flex-start'}>
        {genderMass.map(renderItem)}
      </FlexWrapper>
    </Container>
  )
}
