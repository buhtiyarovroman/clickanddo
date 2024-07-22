import { Background } from '@/shared/ui/background'
import { Button } from '@/shared/ui/button'
import { Header } from '@/widgets/header'
import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BottomContainer, styles } from './styled'
import { UserEntities, userActions, getUserSelector } from '@/entities/User'
import { useDispatch } from 'react-redux'
import { LoaderContext } from '@/app/contexts/Loader'
import { AccountDataForm, TAccountDataFormRef } from '@/features/User'
import { useTypedSelector } from '@/app/store'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'
import { useNavigation } from '@/features/hooks'

export const AccountData = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { goBack } = useNavigation()
  const { setLoading } = useContext(LoaderContext)
  const { user } = useTypedSelector(getUserSelector)
  const formRef = useRef<TAccountDataFormRef | null>(null)
  const isCustomer = user?.role === 'customer'

  const onSubmit = async () => {
    const data = await formRef.current?.getForm()
    if (!data) return

    try {
      setLoading(true)

      const isChangedLogin = data.login !== user?.login

      if (isChangedLogin) {
        const isValidCredential = await UserEntities.UserService.postCheckCred({
          login: data.login,
        })

        if (isValidCredential.data.login) {
          Toast.show({
            type: EToastType.error,
            text2: t('errors.login_used'),
          })
          return
        }
      }

      const defaultData = {
        name: data.name,
        secondName: data.secondName || null,
        email: data.email,
        phone: data.phone,
        country: data.location,
        ...(isChangedLogin ? { login: data.login } : {}),
      }
      const currentData = {
        ...defaultData,
        ...(isCustomer
          ? {}
          : {
              location: {
                type: 'Point',
                coordinates: data.coordinates,
              },
            }),
      }

      await UserEntities.UserService.pathUser(currentData)

      dispatch(userActions.getCurrentUserRequest({}))
      dispatch(userActions.getAllUserRequest({}))

      goBack()
      Toast.show({ type: EToastType.success, text2: 'toasts.change_profile' })
    } catch (err) {
      console.log('onSubmit register =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.SafeArea>
      <Header.Standard goBack title={t('personal_data')} />

      <Background.Scroll
        nestedScrollEnabled
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        pHorizontal={20}>
        {/* Fill Profile User */}
        <AccountDataForm ref={formRef} />
      </Background.Scroll>

      <BottomContainer>
        {/* Button */}
        <Button.Standard text={t('save')} onPress={onSubmit} />
      </BottomContainer>
    </Background.SafeArea>
  )
}
