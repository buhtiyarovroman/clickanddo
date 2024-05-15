import { AuthFeatures } from '@/features/Auth'
import { Background } from '@/shared/ui/background'
import { Button } from '@/shared/ui/button'
import { Header } from '@/widgets/header'
import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BottomContainer, styles } from './styled'
import { TSecondFormRef } from '@/features/Auth/SecondForm'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TRegisterStack } from '@/app/navigation/stacks/Register'
import { EScreens, EStacks } from '@/app/navigation'
import { EUserRole, TUser } from '@/entities/User/models'
import { UserEntities, userActions } from '@/entities/User'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@/features/hooks'
import { EDrawerStackScreens } from '@/app/navigation/drawer/types'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'
import axios from 'axios'
import { TValidationError } from '@/features/api/types'

export const Second = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { setLoading } = useContext(LoaderContext)
  const { navigate } = useNavigation()
  const { type } =
    useRoute<RouteProp<TRegisterStack, EScreens.RegisterSecond>>().params

  const formRef = useRef<TSecondFormRef | null>(null)

  const createRequestData = async () => {
    const data = await formRef.current?.getForm()
    if (!data) return

    try {
      let user: TUser[] = []

      setLoading(true)

      const loc = data.location.length
        ? {
            location: {
              type: 'Point',
              coordinates: data.location,
            },
          }
        : {}

      const requestData = {
        dateOfBirth: data.birthday.toString(),
        email: auth().currentUser?.email || undefined,
        phone: auth().currentUser?.phoneNumber?.replace('+', ''),
        role: type,
        ...data,
        secondName: data.secondName || undefined,
        ...loc,
      }

      const isValidCredential = await UserEntities.UserService.postCheckCred({
        login: requestData.login,
      })

      if (isValidCredential.data.login) {
        Toast.show({
          type: EToastType.error,
          text2: t('errors.login_used'),
        })
        return
      }

      const response = await UserEntities.UserService.postUser(requestData)

      user = [response.data]

      if (type === EUserRole.specialist) {
        const responseTwo = await UserEntities.UserService.postUser({
          ...requestData,
          role: EUserRole.customer,
        })
        user = [...user, responseTwo.data]
      }

      await UserEntities.UserService.postGeneralUserInfo({
        name: data.name,
        location: data.country,
        email: auth().currentUser?.email || undefined,
        phone: auth().currentUser?.phoneNumber?.replace('+', '') || undefined,
      })

      dispatch(userActions.setUser(response.data))
      dispatch(userActions.setUserSessions(user))

      await UserService.setUserId(response.data._id)

      dispatch(userActions.setRegisterDefault())

      navigate(EStacks.Drawer, { screen: EDrawerStackScreens.TabStack })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let error: TValidationError = err?.response?.data

        let errString = error.message.map(item => item.constraints)

        if (
          errString.map(item => item.UniqLogin).includes('Login must be uniq')
        ) {
          Toast.show({
            type: EToastType.error,
            text2: t('errors.login_used'),
          })
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.SafeArea>
      <Header.Standard goBack title={t('registration')} />

      <Background.Scroll
        nestedScrollEnabled
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        pHorizontal={20}>
        {/* Fill Profile User */}
        <AuthFeatures.SecondForm ref={formRef} />
      </Background.Scroll>
      <BottomContainer>
        {/* Button */}
        <Button.Standard text={t('next')} onPress={createRequestData} />
      </BottomContainer>
    </Background.SafeArea>
  )
}
