import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EColors } from '../../Styled'
import {
  FlexWrapper,
  MSemibold,
  SRegular,
  LSemibold,
} from '../../Styled/Styled'
import { wp } from '../../utils'
import { Container, styles } from './styled'

type TRange = {
  min?: number
  max?: number
  value?: number[]
  top?: number
  valueType?: string
  step?: number
  onValueChangeEnd?: (value: number[]) => void
}

const SLIDER_LENGTH = wp(100) - 60

export const Range = ({
  min = 0.5,
  max = 100,
  value = [min, max],
  top = 0,
  step = 10,
  onValueChangeEnd = () => {},
}: TRange) => {
  const { t } = useTranslation()
  const { setting } = useTypedSelector(getUserSelector)
  const [currentValue, setCurrentValue] = useState(value)

  const onChange = (changeValue: number[]) => {
    setCurrentValue(changeValue)
  }

  return (
    <>
      <FlexWrapper justify={'space-between'}>
        <SRegular color={EColors.grey_600}>{t('work_cost')}</SRegular>

        <LSemibold>
          {(value[0] || 0).toFixed(0)}-{(value[1] || 100).toFixed(0)}{' '}
          {setting.currency}
        </LSemibold>
      </FlexWrapper>
      <Container marginTop={top}>
        <FlexWrapper justify={'space-between'}>
          <MSemibold>{min.toFixed(0)}</MSemibold>

          <MSemibold>{max.toFixed(0)}</MSemibold>
        </FlexWrapper>
        <MultiSlider
          min={min}
          step={step}
          max={max}
          sliderLength={SLIDER_LENGTH}
          enabledTwo
          values={currentValue}
          {...styles}
          onValuesChangeFinish={onValueChangeEnd}
          onValuesChange={onChange}
        />
      </Container>
    </>
  )
}
