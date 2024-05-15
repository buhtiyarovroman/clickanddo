import React from 'react'
import { Container, StyledTextInputContainer } from './styled'
import { TPhone } from './types'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { StyleSheet, Text } from 'react-native'
import { EColors } from '../../Styled'

const CELL_COUNT = 6

export const Code = ({
  width = '100%',
  height = '50px',
  value = '',
  style,
  error,
  onChange,
  ...props
}: TPhone) => {
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value: value,
    setValue: onChange,
  })

  const ref = useBlurOnFulfill({ value: value, cellCount: CELL_COUNT })

  return (
    <Container style={style} width={width} {...props}>
      {/* Input container*/}
      <StyledTextInputContainer
        height={height}
        activeOpacity={1}
        hasError={!!error}>
        <CodeField
          ref={ref}
          {...propsCode}
          value={value}
          onChangeText={onChange}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              style={[styles.unFocuseCell, isFocused && styles.focuseCell]}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused && <Cursor />)}
            </Text>
          )}
        />
      </StyledTextInputContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: '100%',
  },
  focuseCell: {
    borderColor: EColors.primary,
  },
  unFocuseCell: {
    fontSize: 24,
    fontWeight: '600',
    width: 44,
    height: 44,
    lineHeight: 38,
    color: EColors.black,
    borderColor: EColors.grey_600,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  keyboardAware: {
    flex: 1,
  },
})
