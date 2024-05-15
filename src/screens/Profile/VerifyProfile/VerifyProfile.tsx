import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { VerifyProfileForm } from '@/features/User'
import { styles } from './styled'
import { LoaderContext } from '@/app/contexts/Loader'
import { useDispatch } from 'react-redux'
import { TVerifyProfileFormRef } from '@/features/User/VerifyProfileForm/types'
import { UserService } from '@/entities/User/services'
import { userActions } from '@/entities/User'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TProfileStack } from '@/app/navigation/stacks/Profile'
import { AdditionalInfoBottomBar } from '@/shared/ui/AdditionalInfoBottomBar'

export const VerifyProfile = () => {
  const { t } = useTranslation()
  const { navigate, goBack } = useNavigation()
  const [height, setHeight] = useState(0)
  const [valid, setValid] = useState(false)
  const { isEdit = false } =
    useRoute<RouteProp<TProfileStack, EScreens.ProfileAddInfoVerification>>()
      .params

  const formRef = useRef<TVerifyProfileFormRef | null>(null)
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const onSkip = () => {
    navigate(EScreens.ProfileAddInfoEducation, {})
  }

  const onSubmitForm = async () => {
    const data = await formRef.current?.getForm()

    if (!data) return
    try {
      setLoading(true)

      await UserService.patchUserVerification({
        id: data.id,
        no: data.no,
        photo: data.photo,
        series: data.series,
      })

      dispatch(userActions.getCurrentUserRequest({}))
      dispatch(userActions.getAllUserRequest({}))

      isEdit && goBack()
      !isEdit && onSkip()
    } catch (err) {
      console.log('onVerificationUser err, =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Background.SafeArea>
        <Header.Progress
          title={t('additional_information')}
          activeTextProgress
          page={2}
          count={4}
          hideProgress={isEdit}
        />

        <Background.Scroll
          style={styles.main}
          contentContainerStyle={{ paddingBottom: height + 16 }}
          pHorizontal={20}>
          <LSemibold mBottom={'16px'}>{t('verify')}</LSemibold>

          <VerifyProfileForm ref={formRef} onChangeValid={setValid} />
        </Background.Scroll>

        <AdditionalInfoBottomBar
          valid={valid}
          isEdit={isEdit}
          getHeight={setHeight}
          onSkip={onSkip}
          onNext={onSubmitForm}
          onSave={onSubmitForm}
        />
      </Background.SafeArea>
    </>
  )
}
