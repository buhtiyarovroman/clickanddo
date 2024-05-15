import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EducationForm } from '@/features/User'

import { styles } from './styled'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'
import axios from 'axios'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { TEducationFormRef } from '@/features/User/EducationForm/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TProfileStack } from '@/app/navigation/stacks/Profile'
import { AdditionalInfoBottomBar } from '@/shared/ui/AdditionalInfoBottomBar'

export const Education = () => {
  const { t } = useTranslation()
  const { navigate, goBack } = useNavigation()
  const { isEdit = false } =
    useRoute<RouteProp<TProfileStack, EScreens.ProfileAddInfoLanguage>>().params

  const [height, setHeight] = useState(0)
  const formRef = useRef<TEducationFormRef | null>(null)
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const onSkip = () => {
    navigate(EScreens.ProfileAddInfoWork, {})
  }

  const onSubmitForm = async () => {
    const data = await formRef.current?.getForm()

    if (!data) return
    try {
      setLoading(true)

      await UserService.pathUser({
        education: data.education.map(el => ({
          name: el.name,
          from: el.from,
          to: el.to ? el.to : undefined,
          discipline: el.discipline,
          location: el.location,
        })),
      })

      dispatch(userActions.getAllUserRequest({}))
      dispatch(userActions.getCurrentUserRequest({}))

      isEdit && goBack()
      !isEdit && onSkip()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('onChangeEducation err =>', err.response?.data)
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
          page={3}
          count={4}
          hideProgress={isEdit}
        />

        <Background.Scroll
          style={styles.main}
          contentContainerStyle={{ paddingBottom: height + 16 }}
          pHorizontal={20}>
          <EducationForm ref={formRef} isEdit={isEdit} />
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
