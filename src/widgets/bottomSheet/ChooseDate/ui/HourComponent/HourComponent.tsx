import React from 'react'
import { THourComponentProps } from './types'
import { Container } from './styled'
import { format } from 'date-fns'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'
import { LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'

export const HourComponent = ({
  date = new Date(),
  active = false,
  disable = false,
  onSelect = () => {},
  ...props
}: THourComponentProps) => {
  const time = format(date, 'HH:mm')

  const mainColor = active ? EColors.white : EColors.grey_700

  const _onSelect = () => {
    onSelect(date)
  }

  return (
    <Container
      disabled={disable}
      disable={disable}
      active={active}
      {...props}
      onPress={_onSelect}>
      <SRegular color={mainColor}>{time}</SRegular>
    </Container>
  )
}
