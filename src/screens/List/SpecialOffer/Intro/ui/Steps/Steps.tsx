import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import {
  FlexWrapper,
  H3SemiBold,
  LSemibold,
  MMedium,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { styles } from './styles'

export const Steps = () => {
  const { t } = useTranslation()

  const data = [
    {
      title: t('offer_steps.creation.title'),
      description: t('offer_steps.creation.description'),
    },
    {
      title: t('offer_steps.consideration.title'),
      description: t('offer_steps.consideration.description'),
    },
    {
      title: t('offer_steps.sale.title'),
      description: t('offer_steps.sale.description'),
    },
  ]

  return (
    <View style={styles.wrapper}>
      <H3SemiBold>{t('how_start')}</H3SemiBold>
      <FlexWrapper width="100%" flexDirection="column" style={styles.list}>
        {data.map((item, index) => {
          return (
            <FlexWrapper key={index} align="flex-start" mTop={'20px'}>
              <FlexWrapper style={styles.item}>
                <MMedium color={EColors.white}>{index + 1}</MMedium>
              </FlexWrapper>
              <FlexWrapper style={styles.text_wrapper}>
                <LSemibold align={'left'}>{item.title}</LSemibold>
                <SRegular mTop="5px">{item.description}</SRegular>
              </FlexWrapper>
            </FlexWrapper>
          )
        })}
      </FlexWrapper>
    </View>
  )
}
