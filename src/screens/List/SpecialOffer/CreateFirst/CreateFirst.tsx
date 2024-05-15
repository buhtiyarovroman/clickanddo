import React, { useRef, useState } from 'react'
import { Header } from '@/widgets/header'

import { useTranslation } from 'react-i18next'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { Background } from '@/shared/ui/background'
import { SpecialOfferFeatures } from '@/features/SpecialOffer'
import { EColors } from '@/shared/ui/Styled'
import { styles } from './styles'
import { View } from 'react-native'
import { TSpecialOfferCreateFirstFormRef } from '@/features/SpecialOffer/FirstForm/types'
import { useDispatch } from 'react-redux'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'

export const CreateFirst = () => {
  const { t } = useTranslation()
  const [valid, setValid] = useState(false)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)
  const ref = useRef<TSpecialOfferCreateFirstFormRef | null>(null)
  const onNext = async () => {
    const data = await ref.current?.getForm()
    if (!data) return

    dispatch(
      specialOfferActions.setState({
        createSpecialOffer: {
          ...createSpecialOffer,

          hashtag: data.tags,
          address: data.address,
          title: data.title,
          hideLikes: data.hideLikes,
        },
      }),
    )

    navigate(EScreens.SpecialOfferCreateSecond)
  }
  const onPressClose = () => {
    dispatch(specialOfferActions.clearState())
    navigate(EScreens.ListMain)
  }

  return (
    <>
      <Header.Progress
        onPressClose={onPressClose}
        withGoBack={false}
        count={4}
        page={1}
        isClose
        title={t('create_offer')}
        activeTextProgress
      />

      <Background.Scroll
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        pHorizontal={20}>
        <SpecialOfferFeatures.FirstForm onChangeValid={setValid} ref={ref} />
        <View style={styles.bottom_view} />
      </Background.Scroll>

      <CustomBottomBar disableShadow>
        <Button.Standard disabled={!valid} onPress={onNext} mBottom="16px">
          <LSemibold color={EColors.white}>{t('next')}</LSemibold>
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
