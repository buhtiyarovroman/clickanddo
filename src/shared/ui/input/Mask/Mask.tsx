import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  StyledTextInputContainer,
  StyledTextInput,
  InputContainer,
  styles,
} from './styled'
import { TMaskInputProps } from './types'
import { EColors, Styled } from '../../Styled'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '../../Icon'
import { AnimatedLabel } from '../AnimatedLabel'

const NEUTRAL_COLOR = EColors.grey_600

const defaultMask = Array.from({ length: 25 }, () => /^[A-Za-z0-9]+$/)

export const Mask = ({
  label = '',
  width = '100%',
  height = '56px',
  value = '',
  style,
  error,
  rightIcon,
  leftIcon,
  leftIconProps,
  rightIconProps,
  onChange,
  onPressRightIcon,
  disabled = false,
  onPress,
  keyboardType = 'default',
  multiline = false,
  inputContainerStyle = {},
  autoFocus = false,
  onSubmitEditing = () => {},
  autoComplete,
  disableLabel = false,
  maxLength,
  ...props
}: TMaskInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const { t } = useTranslation()

  const CurrentLabel = isFocused ? Styled.SMedium : Styled.LMedium

  const onValueChange = (changeValue: string) => {
    onChange && onChange(changeValue)
    setInputValue(changeValue)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Container disabled={disabled} style={style} width={width} {...props}>
      {/* Label */}

      {/* Input container*/}
      <StyledTextInputContainer
        disabled={disabled}
        onPress={onPress}
        height={height}
        activeOpacity={1}
        style={inputContainerStyle}
        hasError={!!error}>
        {/*  Left icon*/}
        {!!leftIcon && (
          <Icon name={leftIcon} fill={NEUTRAL_COLOR} {...leftIconProps} />
        )}

        <AnimatedLabel
          height={height}
          label={label}
          isFocused={isFocused}
          hasValue={!!inputValue}
        />

        <InputContainer isFocused={false}>
          {/* Input */}

          <StyledTextInput
            placeholder={''}
            placeholderTextColor={NEUTRAL_COLOR}
            value={inputValue}
            editable={!disabled}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            onChangeText={onValueChange}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            style={styles.textInput}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            mask={defaultMask}
          />
        </InputContainer>

        {/* Right icon */}
        {!!rightIcon && (
          <TouchableOpacity style={styles.padding} onPress={onPressRightIcon}>
            <Icon name={rightIcon} fill={NEUTRAL_COLOR} {...rightIconProps} />
          </TouchableOpacity>
        )}
      </StyledTextInputContainer>

      {error && (
        <Styled.MRegular mTop={'5px'} mBottom={'10px'} color={EColors.error}>
          {t(error)}
        </Styled.MRegular>
      )}
    </Container>
  )
}
