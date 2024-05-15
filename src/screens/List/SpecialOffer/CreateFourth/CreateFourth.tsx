import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { Header } from '@/widgets/header'
import { useNavigation } from '@/features/hooks'
import { SpecialOfferFeatures } from '@/features/SpecialOffer'
import { TSpecialOfferCreateFourthFormRef } from '@/features/SpecialOffer/FourthForm/types'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { PublicationEntities } from '@/entities/Publication'
import { Background } from '@/shared/ui/background'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { TPostPublicationPayload } from '@/entities/Publication/models'

export const CreateFourth = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)
  const [valid, setValid] = useState(false)
  const ref = useRef<TSpecialOfferCreateFourthFormRef | null>(null)

  const isEdit = !!createSpecialOffer.id

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    dispatch(
      specialOfferActions.setState({
        createSpecialOffer: {
          ...createSpecialOffer,
          description: data.description,
        },
      }),
    )

    const requestData: TPostPublicationPayload = {
      heading: createSpecialOffer.title,
      hashtag: createSpecialOffer.hashtag.map(item => item._id),
      type: 'special-offer',
      minPrice: Number(createSpecialOffer.priceFrom),
      maxPrice: Number(createSpecialOffer.priceTo),
      description: data.description,
      duration: Number(createSpecialOffer.duration),
      relevantUntil: createSpecialOffer.expirationDate,
      currency: createSpecialOffer.currency,
      imageWidth: createSpecialOffer.imageWidth,
      imageHeight: createSpecialOffer.imageHeight,
      hideLikes: createSpecialOffer.hideLikes,
    }

    const newImages = createSpecialOffer.photos.filter(newImg =>
      newImg.includes('/'),
    )
    const oldImages = createSpecialOffer.photos.filter(
      newImg => !newImg.includes('/'),
    )

    try {
      let newId = ''
      if (isEdit) {
        const { data: newPublication } =
          await PublicationEntities.PublicationService.patchPublicationById({
            id: createSpecialOffer.id,
            ...requestData,
          })
        newId = newPublication._id
      }

      if (!isEdit) {
        const { data: newPublication } =
          await PublicationEntities.PublicationService.postPublication(
            requestData,
          )
        newId = newPublication._id
      }

      await PublicationEntities.PublicationService.patchPublicationPhotos({
        id: newId,
        images: newImages,
        oldImages: oldImages,
      })
      Toast.show({ type: 'success', text2: t('offer.success') })
      dispatch(specialOfferActions.clearState())
      navigate(EScreens.ListMain)
    } catch (err) {
      console.log('onCreateSpecialOffer err', err)
    }
  }

  const onPressClose = () => {
    dispatch(specialOfferActions.clearState())
    navigate(EScreens.ListMain)
  }

  return (
    <>
      <Header.Progress
        page={4}
        count={4}
        title={t('create_offer')}
        isClose
        onPressClose={onPressClose}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SpecialOfferFeatures.FourthForm onChangeValid={setValid} ref={ref} />
      </Background.Scroll>
      <CustomBottomBar disableShadow>
        <Button.Standard onPress={onNext} disabled={!valid} mBottom="16px">
          <LSemibold color={EColors.white}>{t('next')}</LSemibold>
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
