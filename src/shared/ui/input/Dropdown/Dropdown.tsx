import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

import { Styled } from '../../Styled'
import { TDropdownProps } from './types'
import { styles, Container } from './styled'

export const Dropdown = ({
  value,
  onSelect,
  items,
  label,
  dropDownDirection = 'DEFAULT',
  style = {},
  customOpen,
  setCustomOpen,
  setOtherControls = () => {},
  ...props
}: TDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const [defValue, setDefValue] = useState(null)

  const openControl = customOpen || open
  const setOpenControl = setCustomOpen || setOpen

  useEffect(() => {
    if (openControl) {
      setOtherControls(false)
    }
  }, [openControl])

  useEffect(() => {
    defValue && onSelect(defValue)
  }, [defValue])

  return (
    <Container {...props}>
      {!!label && (
        <Styled.H3SemiBold mBottom={'12px'}>{label}</Styled.H3SemiBold>
      )}

      <DropDownPicker
        props={{ activeOpacity: 0.8 }}
        theme={'LIGHT'}
        placeholder={label}
        open={openControl}
        value={value}
        items={items}
        setOpen={setOpenControl}
        setValue={setDefValue}
        dropDownDirection={dropDownDirection}
        // TODO - Improve styles
        {...styles}
        style={[style, styles.style]}
      />
    </Container>
  )
}
