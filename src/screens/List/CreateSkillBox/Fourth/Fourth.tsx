import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { Header } from '@/widgets/header'
import { TSkillBoxCreateFourthFormRef } from '@/features/skillBox/FourthForm/types'
import { SkillBoxFeatures } from '@/features/skillBox'
import { useNavigation } from '@/features/hooks'
import { ECurrency, TCreateSkillBoxData } from '@/entities/Skillbox/store/types'
import { PublicationEntities } from '@/entities/Publication'
import { getSkillBoxSelector } from '@/entities/Skillbox'
import { skillBoxActions } from '@/entities/Skillbox/store/actions'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { Background } from '@/shared/ui/background'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { styles } from '../styles'
import { TPostPublicationPayload } from '@/entities/Publication/models'
import { LoaderContext } from '@/app/contexts/Loader'

export const Fourth = () => {
  const { t } = useTranslation()
  const [valid, setValid] = useState(false)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { setLoading } = useContext(LoaderContext)
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)
  const ref = useRef<TSkillBoxCreateFourthFormRef | null>(null)

  const isEdit = !!createSkillBox.id

  const onPressClose = () => {
    dispatch(skillBoxActions.clearState())
    navigate(EScreens.ListMain)
  }
  const onNext = async () => {
    const data = await ref.current?.getForm()
    if (!data) return

    dispatch(
      skillBoxActions.setState({
        createSkillBox: {
          ...createSkillBox,
          initialPrice: data.initialPrice,
          discount: String(data.discount),
          priceAfterDiscount: data.priceAfterDiscount,
          currency: data.currency as ECurrency,
        },
      }),
    )

    const requestData: TCreateSkillBoxData = {
      ...createSkillBox,
      initialPrice: data.initialPrice,
      discount: String(data.discount),
      priceAfterDiscount: data.priceAfterDiscount,
      currency: data.currency as ECurrency,
    }

    setLoading(true)

    const payload: TPostPublicationPayload = {
      heading: requestData.title,
      hashtag: requestData.hashtag.map(item => item._id),
      type: 'skillbox',
      oldPrice: Number(requestData.initialPrice),
      price: Number(requestData.priceAfterDiscount),
      description: requestData.description,
      duration: Number(requestData.duration),
      relevantUntil: requestData.expirationDate,
      currency: requestData.currency,
      address: requestData.address,
      location: {
        type: 'Point',
        coordinates: requestData.location,
      },
      imageHeight: requestData.imageHeight,
      imageWidth: requestData.imageWidth,
      range: Number(requestData.locationRange),
      hideLikes: requestData.hideLikes,
    }

    const newImages = requestData.photos.filter(newImg => newImg.includes('/'))
    const oldImages = requestData.photos.filter(newImg => !newImg.includes('/'))

    try {
      let newId = ''

      if (!isEdit) {
        const { data: newPublication } =
          await PublicationEntities.PublicationService.postPublication(payload)

        newId = newPublication._id
      }

      if (isEdit) {
        const { data: newPublication } =
          await PublicationEntities.PublicationService.patchPublicationById({
            id: requestData.id,
            ...payload,
          })

        newId = newPublication._id
      }

      await PublicationEntities.PublicationService.patchPublicationPhotos({
        id: newId,
        images: newImages,
        oldImages: oldImages,
      })

      Toast.show({ type: 'success', text2: t('skillbox.success') })
      onPressClose()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header.Progress
        onPressClose={onPressClose}
        withGoBack={false}
        count={4}
        page={4}
        isClose
        title={t('skillbox.create')}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SkillBoxFeatures.FourthForm onChangeValid={setValid} ref={ref} />
        <View style={styles.bottom_view} />
      </Background.Scroll>

      <CustomBottomBar disableShadow>
        <Button.Standard onPress={onNext} mBottom="16px">
          <LSemibold color={EColors.white}>{t('next')}</LSemibold>
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
