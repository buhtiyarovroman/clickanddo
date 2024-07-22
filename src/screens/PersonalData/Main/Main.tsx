import { Background } from '@/shared/ui/background'
import { Button } from '@/shared/ui/button'
import { Header } from '@/widgets/header'
import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BottomContainer, styles } from './styled'
import { LoaderContext } from '@/app/contexts/Loader'
import auth from '@react-native-firebase/auth'
import { PersonalDataForm, TPersonalDataFormRef } from '@/features/User'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { AuthFeatures } from '@/features/Auth'
import { Keyboard } from 'react-native'
import { Sentry } from '@/shared/lib'
import { UserService } from '@/entities/User/services'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'

export const Main = () => {
  const { t } = useTranslation()
  const { navigate, goBack } = useNavigation()
  const { setLoading } = useContext(LoaderContext)

  const formRef = useRef<TPersonalDataFormRef | null>(null)

  const onSubmit = async () => {
    const data = await formRef.current?.getForm()
    if (!data) return

    const firebasePhone = auth().currentUser?.phoneNumber || ''

    const localPhone = data.phone || ''

    try {
      Keyboard.dismiss()
      setLoading(true)

      if (firebasePhone !== localPhone) {
        const response = await UserService.postCheckCred({
          phone: localPhone,
          firebaseId: auth()?.currentUser?.uid,
        })

        if (response.data.firebasePhone) {
          Toast.show({
            type: 'error',
            text2: 'firebase_error.auth/credential-already-in-use',
          })
          return
        }

        await AuthFeatures.Firebase.verifyPhoneNumber(localPhone, () => {
          navigate(EScreens.PersonalDataPhoneVerify, {
            phone: data.phone?.replace('+', '') || '',
            data: data,
          })
        })

        return
      }

      await UserService.patchGeneralUserInfo(data)

      Toast.show({
        type: EToastType.success,
        text2: 'toasts.data_successfully_updated',
      })

      goBack()
    } catch (err) {
      console.log('onSubmit register =>', err)
      Sentry.captureException(`onSubmit GeneralData => ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.SafeArea>
      <Header.Standard openDriver goBack title={t('personal_data')} />

      <Background.Scroll
        nestedScrollEnabled
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={'handled'}
        pHorizontal={20}>
        {/* Fill Profile User */}
        <PersonalDataForm ref={formRef} />

        <MRegular color={EColors.grey_500}>{t('only_auth_data')}</MRegular>
      </Background.Scroll>
      <BottomContainer>
        {/* Button */}
        <Button.Standard
          text={t('next')}
          onPress={onSubmit}
          // disabled={!isValid}
        />
      </BottomContainer>
    </Background.SafeArea>
  )
}
