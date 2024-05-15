import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  StyledTextInputContainer,
  StyledTextInput,
  InputContainer,
  styles,
} from './styled'
import { TStandard } from './types'
import { EColors, Styled } from '../../Styled'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Svg } from '@assets/Svg'

const NEUTRAL_COLOR = EColors.grey_600

export const Password = ({
  label = '',
  width = '100%',
  height = '56px',
  value = '',
  style,
  error,
  RightIcon,
  LeftIcon,
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
  ...props
}: TStandard) => {
  const [inputValue, setInputValue] = useState<string>(value)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [secure, setSecure] = useState<boolean>(true)

  const { t } = useTranslation()

  const CurrentLabel = isFocused ? Styled.SMedium : Styled.LSemibold
  const CurrentIcon = secure ? Svg.EyeHidden : Svg.Eye

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
        {!!LeftIcon && <LeftIcon fill={NEUTRAL_COLOR} {...leftIconProps} />}

        <InputContainer isFocused={isFocused}>
          {label && isFocused && (
            <CurrentLabel mTop={'3px'} color={EColors.grey_600}>
              {label}
            </CurrentLabel>
          )}
          {/* Input */}

          <StyledTextInput
            placeholder={!isFocused ? label : ''}
            placeholderTextColor={NEUTRAL_COLOR}
            value={inputValue}
            editable={!disabled}
            hasLeftIcon={!!LeftIcon}
            hasRightIcon={!!RightIcon}
            onChangeText={onValueChange}
            keyboardType={keyboardType}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            style={styles.textInput}
            secureTextEntry={secure}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </InputContainer>

        <TouchableOpacity
          style={styles.padding}
          onPress={() => setSecure(!secure)}>
          <CurrentIcon width={18} height={18} />
        </TouchableOpacity>
      </StyledTextInputContainer>

      {error && (
        <Styled.MRegular mTop={'5px'} mBottom={'10px'} color={EColors.error}>
          {t(`${error}`)}
        </Styled.MRegular>
      )}
    </Container>
  )
}
