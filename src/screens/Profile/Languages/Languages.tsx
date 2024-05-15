import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { ChangeLanguages } from '@/features/User'
import { styles } from './styled'
import { TChangeLangFormRef } from '@/features/User/ChangeLanguages/types'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'
import axios from 'axios'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TProfileStack } from '@/app/navigation/stacks/Profile'
import { AdditionalInfoBottomBar } from '@/shared/ui/AdditionalInfoBottomBar'

export const Languages = () => {
  const { t } = useTranslation()
  const { navigate, goBack } = useNavigation()
  const { isEdit = false } =
    useRoute<RouteProp<TProfileStack, EScreens.ProfileAddInfoLanguage>>().params

  const [height, setHeight] = useState(0)
  const formRef = useRef<TChangeLangFormRef | null>(null)
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const onSkip = () => {
    navigate(EScreens.ProfileAddInfoVerification, {})
  }

  const onSubmitForm = async () => {
    const data = await formRef.current?.getForm()

    if (!data) return
    try {
      setLoading(true)

      await UserService.pathUser({ languages: data.lang })

      // dispatch(userActions.setUser(response.data))
      dispatch(userActions.getAllUserRequest({}))
      dispatch(userActions.getCurrentUserRequest({}))

      isEdit && goBack()
      !isEdit && onSkip()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('onChangeLang err, =>', err.response?.data)
      }
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
          page={1}
          count={4}
          hideProgress={isEdit}
        />

        <Background.Scroll
          style={styles.main}
          contentContainerStyle={{ paddingBottom: height + 16 }}
          pHorizontal={20}>
          <LSemibold mBottom={'16px'}>{t('language_and_level')}</LSemibold>

          <ChangeLanguages ref={formRef} isEdit={isEdit} pBottom={height} />
        </Background.Scroll>

        <AdditionalInfoBottomBar
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
