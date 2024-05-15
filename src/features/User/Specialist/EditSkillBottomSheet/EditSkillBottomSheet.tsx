import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { TEditSkillsBottomSheetProps } from './types'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { styles } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { Skills } from './components'
import { THashTag } from '@/entities/User/models'
import { Button } from '@/shared/ui/button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Background } from '@/shared/ui/background'
import { UserEntities, getUserSelector, userActions } from '@/entities/User'
import { LoaderContext } from '@/app/contexts/Loader'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@/app/store'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const EditSkillBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TEditSkillsBottomSheetProps
>(({ onClose = () => {} }, ref) => {
  const { bottom } = useSafeAreaInsets()
  const { user } = useTypedSelector(getUserSelector)
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)
  const [additional, setAdditional] = useState<THashTag[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.hashtag.length > 0) {
      setAdditional(user.hashtag)
    }
  }, [user])

  const onSave = async () => {
    setLoading(true)
    try {
      const ids = [...(additional.map(item => item._id) || [])]

      await UserEntities.UserService.pathUser({ hashtag: ids })

      dispatch(userActions.getCurrentUserRequest({}))
      dispatch(userActions.getAllUserRequest({}))

      onClose()
    } catch (err) {
      console.log('onSaveSkills =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BottomSheet.Base
        snapPoints={['80%']}
        ref={ref}
        containerStyle={styles.main}>
        <Background.Scroll
          bounces={false}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom + 16 }}>
          <H3SemiBold mBottom={'20px'}>{t('specialist_skills')}</H3SemiBold>

          <MRegular color={EColors.grey_600} mBottom={'20px'}>
            {t('specialist_skills_description')}
          </MRegular>

          <Skills.Additional skills={additional} setSkills={setAdditional} />

          <Button.Standard
            onPress={onSave}
            mTop={'16px'}
            text={t('save')}
            mBottom={'12px'}
          />

          <Button.Standard
            onPress={onClose}
            text={t('cancel')}
            color={EColors.transparent}
            textColor={EColors.black}
            style={styles.button}
          />
        </Background.Scroll>
      </BottomSheet.Base>
    </>
  )
})
