import React from 'react'
import { Container, StyledTextInputContainer, StyledTextInput } from './styled'
import { THashtagInputProps } from './types'
import { EColors, Styled } from '../../Styled'
import { Icon } from '../../Icon'
import { THashTag } from '@/entities/User/models'
import { FlexWrapper, MRegular } from '../../Styled/Styled'
import { HashtagItem } from '../../HashtagItem'

const NEUTRAL_COLOR = EColors.grey_600

export const Hashtag = ({
  value = [],
  error,
  leftIcon,
  leftIconProps,
  inputValue = '',
  onChangeInput = () => {},
  onDelete = () => {},
  placeholder = '',
  limit,
  disabled = false,
  ...props
}: THashtagInputProps) => {
  const isLimit = limit ? value.length === limit : false

  const renderItem = (item: THashTag) => (
    <HashtagItem
      isActive
      key={item._id}
      showClose
      onPressClose={onDelete}
      {...item}
    />
  )

  return (
    <Container {...props}>
      {/* Input container*/}
      <StyledTextInputContainer hasError={!!error}>
        {/*  Left icon*/}
        {!!leftIcon && (
          <FlexWrapper width={'auto'} mRight={'12px'}>
            <Icon
              name={leftIcon}
              stroke={NEUTRAL_COLOR}
              fill={NEUTRAL_COLOR}
              {...leftIconProps}
            />
          </FlexWrapper>
        )}

        {value.map(renderItem)}

        {/* Input */}
        {!isLimit && (
          <StyledTextInput
            value={inputValue}
            onChangeText={onChangeInput}
            placeholder={placeholder}
            placeholderTextColor={EColors.grey_600}
            editable={!disabled}
          />
        )}
      </StyledTextInputContainer>

      {limit && (
        <FlexWrapper mTop={'10px'} justify={'flex-end'}>
          <MRegular color={EColors.grey_600}>
            {value.length} / {limit}
          </MRegular>
        </FlexWrapper>
      )}

      {error && (
        <Styled.MRegular mTop={'5px'} mBottom={'10px'} color={EColors.error}>
          {error}
        </Styled.MRegular>
      )}
    </Container>
  )
}
