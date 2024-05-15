import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Icon } from '../../Icon'
import { EColors, Styled } from '../../Styled'

import { AnimatedLabel } from '../AnimatedLabel'

import {
  styles,
  Container,
  InputContainer,
  StyledTextInput,
  StyledTextInputContainer,
} from './styled'
import { TStandard } from './types'

const NEUTRAL_COLOR = EColors.grey_600

export const Standard = ({
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
  maxLength,
  onFocused = () => {},
  onBlur = () => {},
  fontSize = 16,
  disableLabel = false,
  ...props
}: TStandard) => {
  const [inputValue, setInputValue] = useState<string>(value)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const { t, keys } = useTranslation()

  const onValueChange = (changeValue: string) => {
    onChange && onChange(changeValue)
    setInputValue(changeValue)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const _onFocused = () => {
    onFocused()
    setIsFocused(true)
  }

  const iconSize = leftIcon ? 12 + (leftIconProps?.size || 30) : undefined

  return (
    <Container disabled={disabled} style={style} width={width} {...props}>
      {/* Input container*/}
      <StyledTextInputContainer
        disabled={disabled}
        onPress={onPress}
        height={height}
        activeOpacity={!disabled && !!onPress ? 0.8 : 1}
        style={inputContainerStyle}
        hasError={!!error}>
        {/*  Left icon*/}
        {!!leftIcon && (
          <Icon name={leftIcon} fill={NEUTRAL_COLOR} {...leftIconProps} />
        )}

        {!disableLabel && (
          <AnimatedLabel
            height={height}
            label={label}
            isFocused={isFocused}
            hasValue={!!inputValue}
            iconSize={iconSize}
          />
        )}

        <InputContainer
          isFocused={false}
          pointerEvents={!!onPress ? 'none' : 'auto'}>
          {/* Input */}
          <StyledTextInput
            placeholder={disableLabel ? label : ''}
            placeholderTextColor={NEUTRAL_COLOR}
            value={inputValue}
            editable={!disabled && !onPress}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon}
            onChangeText={onValueChange}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            style={{ fontSize }}
            maxLength={maxLength}
            onFocus={_onFocused}
            onBlur={() => {
              setIsFocused(false)
              onBlur()
            }}
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
          {t(error as keyof typeof keys)}
        </Styled.MRegular>
      )}
    </Container>
  )
}
