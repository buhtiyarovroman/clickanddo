import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WorkForm } from '@/features/User'

import { styles } from './styled'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'
import axios from 'axios'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { TWorkFormRef } from '@/features/User/WorkForm/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TProfileStack } from '@/app/navigation/stacks/Profile'
import { AdditionalInfoBottomBar } from '@/shared/ui/AdditionalInfoBottomBar'

export const Work = () => {
  const { t } = useTranslation()
  const { navigate, goBack } = useNavigation()
  const [height, setHeight] = useState(0)
  const formRef = useRef<TWorkFormRef | null>(null)
  const { isEdit = false } =
    useRoute<RouteProp<TProfileStack, EScreens.ProfileAddInfoWork>>().params

  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const onSkip = () => {
    navigate(EScreens.ProfileMain)
  }

  const onSubmitForm = async () => {
    const data = await formRef.current?.getForm()

    if (!data) return
    try {
      setLoading(true)

      await UserService.pathUser({
        work: data.works.map(item => ({
          name: item.nameOfCompany,
          location: item.companyLocation,
          from: item.from,
          to: !!item.to ? item.to : undefined,
        })),
      })

      // dispatch(userActions.setUser(response.data))
      dispatch(userActions.getAllUserRequest({}))
      dispatch(userActions.getCurrentUserRequest({}))

      isEdit && goBack()
      !isEdit && onSkip()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('onSubmitForm Work err, =>', err.response?.data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Background.SafeArea>
        <Header.Progress
          title={t('work_experience')}
          activeTextProgress
          page={4}
          count={4}
          hideProgress={isEdit}
        />

        <Background.Scroll
          pHorizontal={20}
          style={styles.main}
          nestedScrollEnabled
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ paddingBottom: height + 16 }}>
          <WorkForm ref={formRef} isEdit={isEdit} />
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
