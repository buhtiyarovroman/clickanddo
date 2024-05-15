import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '@/app/store'
import { EScreens } from '@/app/navigation'
import { Header } from '@/widgets/header'
import { SpecialOfferFeatures } from '@/features/SpecialOffer'
import { useNavigation } from '@/features/hooks'
import { TSpecialOfferCreateThirdFormRef } from '@/features/SpecialOffer/ThirdForm/types'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Background } from '@/shared/ui/background'
import { Image } from 'react-native'

export const CreateThird = () => {
  const { t } = useTranslation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)
  const [valid, setValid] = useState(false)
  const ref = useRef<TSpecialOfferCreateThirdFormRef | null>(null)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const onNext = async () => {
    const data = await ref.current?.getForm()

    const isFirstImageLocal = !!data.photos[0].path.includes('/')

    if (!data) return
    const getSizePromise = new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        Image.getSize(
          data.photos[0].path,
          (width, height) => {
            resolve({ width, height })
          },
          reject,
        )
      },
    )
    try {
      let imageHeight = 0
      let imageWidth = 0

      if (isFirstImageLocal) {
        const { width, height } = await getSizePromise

        imageHeight = height
        imageWidth = width
      }

      if (!isFirstImageLocal) {
        imageHeight = createSpecialOffer.imageHeight
        imageWidth = createSpecialOffer.imageWidth
      }

      dispatch(
        specialOfferActions.setState({
          createSpecialOffer: {
            ...createSpecialOffer,
            photos: data.photos.map(item => item.path),
            imageWidth: imageWidth,
            imageHeight: imageHeight,
          },
        }),
      )
    } catch (err) {}

    navigate(EScreens.SpecialOfferCreateFourth)
  }

  const onPressClose = () => {
    dispatch(specialOfferActions.clearState())
    navigate(EScreens.ListMain)
  }

  return (
    <>
      <Header.Progress
        page={3}
        count={4}
        title={t('create_offer')}
        isClose
        onPressClose={onPressClose}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SpecialOfferFeatures.ThirdForm onChangeValid={setValid} ref={ref} />
      </Background.Scroll>
      <CustomBottomBar disableShadow>
        <Button.Standard onPress={onNext} disabled={!valid} mBottom="16px">
          <LSemibold color={EColors.white}>{t('next')}</LSemibold>
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
