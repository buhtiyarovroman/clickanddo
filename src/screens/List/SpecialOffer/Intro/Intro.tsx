import React from 'react'
import { useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'
import { Header } from '@/widgets/header'
import { Background } from '@/shared/ui/background'
import { Button } from '@/shared/ui/button'
import { LMedium } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useNavigation } from '@/features/hooks'
import { Faq, IntroCard, Steps } from './ui'

export const Intro = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const onPressCreate = () => {
    navigate(EScreens.SpecialOfferCreateFirst)
  }
  return (
    <>
      <Header.CenterTitle disableShadow title={t('special_offers')} goBack />
      <Background.Scroll pHorizontal={20}>
        <IntroCard onPressCreate={onPressCreate} />
        <Steps />
        <Button.Standard onPress={onPressCreate} mTop="40px">
          <LMedium color={EColors.white}>{t('create_offer')}</LMedium>
        </Button.Standard>
        <Faq />
      </Background.Scroll>
    </>
  )
}
