import React from 'react'
import {
  Container,
  StyledTextInputContainer,
  InputContainer,
  styles,
} from './styled'
import { TStandard } from './types'
import { EColors } from '../../Styled'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from '../../Icon'
import { MRegular } from '../../Styled/Styled'
import { useTranslation } from 'react-i18next'

const NEUTRAL_COLOR = EColors.grey_600

export const Touchable = ({
  label = '',
  width = '100%',
  height = '56px',
  value = '',
  style,
  error,
  onPressRightIcon,
  disabled = false,
  onPress,
  inputContainerStyle = {},
  leftIcon,
  disableRightIcon = false,
  ...props
}: TStandard) => {
  const { t } = useTranslation()
  const currentLang = value ? EColors.black : EColors.grey_600
  return (
    <Container disabled={disabled} style={style} width={width} {...props}>
      {/* Input container*/}
      <StyledTextInputContainer
        disabled={disabled}
        onPress={onPress}
        height={height}
        activeOpacity={1}
        style={inputContainerStyle}
        hasError={!!error}>
        {leftIcon && (
          <TouchableOpacity style={styles.padding} onPress={onPressRightIcon}>
            <Icon name={leftIcon} fill={NEUTRAL_COLOR} size={24} />
          </TouchableOpacity>
        )}
        <InputContainer isFocused={false}>
          <MRegular
            mLeft={leftIcon ? '5px' : '0px'}
            mTop={'3px'}
            color={currentLang}>
            {value || label}
          </MRegular>
        </InputContainer>

        {/* Right icon */}
        {!disableRightIcon && (
          <TouchableOpacity style={styles.padding} onPress={onPressRightIcon}>
            <Icon name={'AngleArrowRight'} stroke={NEUTRAL_COLOR} size={24} />
          </TouchableOpacity>
        )}
      </StyledTextInputContainer>

      {error && (
        <MRegular mTop={'5px'} mBottom={'10px'} color={EColors.error}>
          {t(error)}
        </MRegular>
      )}
    </Container>
  )
}
