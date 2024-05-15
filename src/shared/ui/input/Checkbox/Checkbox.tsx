import React from 'react'
import { Container, styles } from './styled'
import { TCheckboxProps } from './types'
import { Icon } from '../../Icon'

export const Checkbox = ({
  value = false,
  onChange = () => {},
  size = 20,
  ...props
}: TCheckboxProps) => {
  return (
    <Container
      size={size}
      isActive={value}
      onPress={() => onChange(!value)}
      {...props}>
      {value && <Icon style={styles.icon} size={size} name={'Checked'} />}
    </Container>
  )
}
