import { Background } from '@/shared/ui/background'
import React from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TAuthStack } from '@/app/navigation/stacks/Auth'
import { EScreens } from '@/app/navigation'
import { AuthFeatures } from '@/features/Auth'
import { Header } from '@/widgets/header'
import { useAuthNavigate } from '@/features/User/hooks'

export const VerifyPhone = () => {
  const { t } = useTranslation()
  const { onInitialGetUser } = useAuthNavigate()

  const { phone } =
    useRoute<RouteProp<TAuthStack, EScreens.AuthVerifyPhone>>().params

  const onConfirmCode = () => {
    onInitialGetUser()
  }

  return (
    <Background.SafeArea>
      <Header.Standard goBack title={t('confirm')} />
      <Background.Standard style={styles.main}>
        <AuthFeatures.Code phone={phone} onConfirmCode={onConfirmCode} />
      </Background.Standard>
    </Background.SafeArea>
  )
}
