import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { Header } from '@/widgets/header'
import { TSkillBoxCreateFirstFormRef } from '@/features/skillBox/FirstForm/types'
import { SkillBoxFeatures } from '@/features/skillBox'
import { useNavigation } from '@/features/hooks'
import { getSkillBoxSelector } from '@/entities/Skillbox'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { TInterest } from '@/entities/Interests/models'
import { skillBoxActions } from '@/entities/Skillbox/store/actions'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { Background } from '@/shared/ui/background'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { styles } from '../styles'

export const First = () => {
  const { t } = useTranslation()
  const [valid, setValid] = useState(false)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)

  const ref = useRef<TSkillBoxCreateFirstFormRef | null>(null)
  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    const isLocalFirstImage = !!data.photos[0].path.includes('/')

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

      //if First image from device
      if (isLocalFirstImage) {
        const { width, height } = await getSizePromise

        imageHeight = height
        imageWidth = width
      }

      //if first image from backend
      if (!isLocalFirstImage) {
        imageHeight = createSkillBox.imageHeight
        imageWidth = createSkillBox.imageWidth
      }

      dispatch(
        skillBoxActions.setState({
          createSkillBox: {
            ...createSkillBox,
            hashtag: data.tags,
            photos: data.photos.map(item => item.path),
            title: data.title,
            hideLikes: data.hideLikes,
            imageWidth: imageHeight,
            imageHeight: imageHeight,
          },
        }),
      )

      navigate(EScreens.CreateSkillBoxSecond)
    } catch (error) {
      console.error('Error getting image size:', error)
    }
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
        title={t('skillbox.create')}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SkillBoxFeatures.FirstForm onChangeValid={setValid} ref={ref} />
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
