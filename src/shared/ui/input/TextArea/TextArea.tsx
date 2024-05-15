import React, { useEffect, useState } from 'react'
import { StyledTextArea, styles } from './styled'
import { EColors, Styled } from '../../Styled'
import { TMargin } from '../../utils'
import { useTranslation } from 'react-i18next'
import { FlexWrapper, MRegular } from '../../Styled/Styled'

type TTextArea = {
  label?: string
  value?: string
  width?: string | number
  height?: string | number
  placeholder?: string
  limit?: number
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (value: string) => void
  error?: string
  require?: boolean
  showTextLimit?: boolean
} & TMargin

export const TextArea = ({
  width = '100%',
  height = 136,
  limit = 200,
  onFocus,
  onBlur,
  value = '',
  onChange,
  placeholder = '',
  error,
  showTextLimit = false,
  ...props
}: TTextArea) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<string>(value)

  const onValueChange = (changeValue: string) => {
    onChange && changeValue.length <= limit && onChange(changeValue)
    setInputValue(changeValue)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <>
      <Styled.FlexWrapper
        {...props}
        style={{ width }}
        flexDirection="column"
        align="flex-start">
        <StyledTextArea
          style={[styles.textArea, { height }]}
          error={!!error}
          multiline
          value={inputValue}
          onChangeText={onValueChange}
          placeholder={placeholder}
          placeholderTextColor={EColors.grey_600}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={limit}
        />

        <FlexWrapper mTop={'10px'} justify={'space-between'}>
          {/* Error */}
          <Styled.MRegular style={{ width: '70%' }} color={EColors.error}>
            {t(error)}
          </Styled.MRegular>

          {showTextLimit && (
            <MRegular color={EColors.grey_600}>
              {value.length}/{limit}
            </MRegular>
          )}
        </FlexWrapper>
      </Styled.FlexWrapper>
    </>
  )
}
