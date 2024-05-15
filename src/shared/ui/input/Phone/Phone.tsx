import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  Container,
  StyledTextInputContainer,
  StyledTextInput,
  InputContainer,
  styles,
  CodeView,
  pickerStyles,
} from './styled'
import { TPhoneInputRef, TStandard } from './types'
import { EColors, Styled } from '../../Styled'

import {
  CountryPicker,
  countryCodes,
  CountryItem,
} from 'react-native-country-codes-picker'
import i18next from 'i18next'
import { TextInput } from 'react-native'

const NEUTRAL_COLOR = EColors.grey_600

export const Phone = forwardRef<TPhoneInputRef, TStandard>(
  (
    {
      label = '',
      width = '100%',
      height = '56px',
      value = '',
      style,
      error,
      onChange,
      disabled = false,
      onPress,
      multiline = false,
      inputContainerStyle = {},
      autoFocus = false,
      onSubmitEditing = () => {},
      autoComplete,
      ...props
    },
    ref,
  ) => {
    const DEFAULT_COUNTRY = countryCodes?.find(el => el.code === 'UA')
    const [inputValue, setInputValue] = useState<string>(value)
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const [openDrop, setOpenDrop] = useState<boolean>(false)
    const [countryCode, setCountryCode] = useState<CountryItem | undefined>(
      DEFAULT_COUNTRY,
    )

    const phoneInput = useRef<TextInput>(null)

    const { t } = useTranslation()

    const onValueChange = (changeValue: string) => {
      onChange && onChange(changeValue)
      setInputValue(changeValue)
    }

    useEffect(() => {
      setInputValue(value)
    }, [value])

    // useEffect(() => {
    //   const phoneNumber = parsePhoneNumber(inputValue)
    //   // console.log('phoneNumber', phoneNumber)

    //   if (phoneNumber) {
    //     phoneInput.current?.setState({
    //       countryCode: phoneNumber.country,
    //       number: phoneNumber.nationalNumber,
    //       code: phoneNumber.countryCallingCode,
    //     })
    //     setValue(phoneNumber.nationalNumber)

    //     const NEW_COUNTRY = countryCodes?.find(
    //       el => el.code === phoneNumber.country,
    //     )
    //     setCountryCode(NEW_COUNTRY)
    //   }
    // }, [inputValue])

    const getLang = () => {
      if (i18next.language === 'uk') return 'ua'
      return i18next.language
    }

    useImperativeHandle(ref, () => ({
      getPhoneInfo: () => {
        return {
          phone: inputValue,
          countryCode: countryCode?.dial_code || 'UA',
        }
      },
    }))

    return (
      <>
        <Container disabled={disabled} style={style} width={width} {...props}>
          {/* Input container*/}
          <StyledTextInputContainer
            disabled={disabled}
            onPress={onPress}
            height={height}
            activeOpacity={1}
            style={inputContainerStyle}
            hasError={!!error}>
            {/*  Left icon*/}
            <CodeView onPress={() => setOpenDrop(true)}>
              <Styled.LMedium>{countryCode?.flag}</Styled.LMedium>

              <Styled.LRegular mLeft={'5px'}>
                {countryCode?.dial_code}
              </Styled.LRegular>
            </CodeView>
            <InputContainer>
              {/* Input */}
              <StyledTextInput
                placeholder={label}
                placeholderTextColor={NEUTRAL_COLOR}
                value={inputValue}
                editable={!disabled}
                hasLeftIcon={false}
                hasRightIcon={false}
                onChangeText={onValueChange}
                keyboardType={'number-pad'}
                multiline={multiline}
                onSubmitEditing={onSubmitEditing}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                style={styles.textInputPhone}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={12}
              />
            </InputContainer>
          </StyledTextInputContainer>

          {error && (
            <Styled.MRegular
              mTop={'5px'}
              mBottom={'10px'}
              color={EColors.error}>
              {t(error)}
            </Styled.MRegular>
          )}
        </Container>

        <CountryPicker
          show={openDrop}
          lang={getLang()}
          pickerButtonOnPress={item => {
            setCountryCode(item)
            setOpenDrop(false)
          }}
          style={{ ...pickerStyles }}
          enableModalAvoiding={false}
          onBackdropPress={() => setOpenDrop(false)}
          inputPlaceholderTextColor={EColors.grey_600}
          searchMessage={t('inputs.phone_code.not_fond')}
          inputPlaceholder={t('inputs.phone_code.title')}
        />
      </>
    )
  },
)
