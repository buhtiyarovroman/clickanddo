import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { Header } from '@/widgets/header'
import { TSkillBoxCreateThirdFormRef } from '@/features/skillBox/ThirdForm/types'
import { SkillBoxFeatures } from '@/features/skillBox'
import { useNavigation } from '@/features/hooks'
import { getSkillBoxSelector } from '@/entities/Skillbox'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { skillBoxActions } from '@/entities/Skillbox/store/actions'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { Background } from '@/shared/ui/background'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { styles } from '../styles'

export const Third = () => {
  const { t } = useTranslation()
  const [valid, setValid] = useState(false)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)
  const ref = useRef<TSkillBoxCreateThirdFormRef | null>(null)
  const onNext = async () => {
    const data = await ref.current?.getForm()
    if (!data) return

    dispatch(
      skillBoxActions.setState({
        createSkillBox: {
          ...createSkillBox,
          description: data.description,
          duration: data.duration,
        },
      }),
    )

    navigate(EScreens.CreateSkillBoxFourth)
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
        page={3}
        isClose
        title={t('skillbox.create')}
        activeTextProgress
      />

      <Background.Scroll pHorizontal={20}>
        <SkillBoxFeatures.ThirdForm onChangeValid={setValid} ref={ref} />
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
