import { View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTypedSelector } from '@/app/store'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import { Header } from '@/widgets/header'
import { useTranslation } from 'react-i18next'
import { Background } from '@/shared/ui/background'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { SpecialOfferFeatures } from '@/features/SpecialOffer'
import { styles } from '../CreateFirst/styles'
import { TSpecialOfferCreateSecondFormRef } from '@/features/SpecialOffer/SecondForm/types'
import { useDispatch } from 'react-redux'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const CreateSecond = () => {
  const { t } = useTranslation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)
  const [valid, setValid] = useState(false)
  const ref = useRef<TSpecialOfferCreateSecondFormRef | null>(null)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onNext = async () => {
    const data = await ref.current?.getForm()
    if (!data) return

    dispatch(
      specialOfferActions.setState({
        createSpecialOffer: {
          ...createSpecialOffer,
          priceFrom: +data.priceFrom,
          priceTo: +data.priceTo,
          duration: data.duration,
          expirationDate: data.expirationDate,
          currency: data.currency,
        },
      }),
    )

    navigate(EScreens.SpecialOfferCreateThird)
  }

  const onPressClose = () => {
    dispatch(specialOfferActions.clearState())
    navigate(EScreens.ListMain)
  }

  return (
    <>
      <Header.Progress
        page={2}
        count={4}
        title={t('create_offer')}
        isClose
        onPressClose={onPressClose}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SpecialOfferFeatures.SecondForm onChangeValid={setValid} ref={ref} />
        <View style={styles.bottom_view} />
      </Background.Scroll>
      <CustomBottomBar disableShadow>
        <Button.Standard onPress={onNext} disabled={!valid} mBottom="16px">
          <LSemibold color={EColors.white}>{t('next')}</LSemibold>
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
