import React from 'react'
import { TDateComponentsProps } from './types'
import { Container } from './styled'
import { format } from 'date-fns'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'
import { LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'

export const DateComponent = ({
  date = new Date(),
  active = false,
  onSelect = () => {},
  ...props
}: TDateComponentsProps) => {
  const day = format(date, 'EEEEEE', { locale: dateLocale[i18next.language] })
  const data = format(date, 'dd')
  const month = format(date, 'MMM', { locale: dateLocale[i18next.language] })

  const secondColor = active ? EColors.white : EColors.dark_L3
  const mainColor = active ? EColors.white : EColors.black

  const _onSelect = () => {
    onSelect(date)
  }

  return (
    <Container active={active} {...props} onPress={_onSelect}>
      <SRegular color={secondColor}>{day}</SRegular>
      <LSemibold color={mainColor}>{data}</LSemibold>
      <SRegular color={secondColor}>{month}</SRegular>
    </Container>
  )
}
