import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { LoaderContext } from '@/app/contexts/Loader'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TPersonalDataStack } from '@/app/navigation/stacks/PersonalData'
import { EScreens } from '@/app/navigation'
import { AuthFeatures } from '@/features/Auth'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { UserService } from '@/entities/User/services'
import { useNavigation } from '@/features/hooks'

export const VerifyPhone = () => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)
  const { goBack } = useNavigation()
  const { phone, data } =
    useRoute<RouteProp<TPersonalDataStack, EScreens.PersonalDataPhoneVerify>>()
      .params

  const onConfirmCode = async () => {
    try {
      setLoading(true)

      await UserService.patchGeneralUserInfo(data)

      Toast.show({
        type: 'success',
      })

      goBack()
    } catch (err) {
      console.log('Verify generalData err =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.SafeArea>
      <Header.Standard goBack title={t('personal_data')} />

      <Background.Scroll contentContainerStyle={styles.main} pHorizontal={20}>
        {/* Fill Profile User */}
        <AuthFeatures.Code
          phone={phone}
          onConfirmCode={onConfirmCode}
          isConfirm
        />
      </Background.Scroll>
    </Background.SafeArea>
  )
}

const styles = StyleSheet.create({
  main: { height: '100%' },
})
