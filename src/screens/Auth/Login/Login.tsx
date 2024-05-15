import { Background } from '@/shared/ui/background'
import React from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { Header } from '@/widgets/header'
import { AuthFeatures } from '@/features/Auth'
import { FlexWrapper, H1 } from '@/shared/ui/Styled/Styled'
import { Image } from 'react-native'
import { Png } from '@assets/Png'

export const Login = () => {
  const { t } = useTranslation()

  return (
    <Background.SafeArea>
      <Header.Standard goBack disableShadow />
      <Background.Scroll
        style={styles.main}
        contentContainerStyle={styles.mainContent}>
        <FlexWrapper flexDirection={'column'} height={'95%'}>
          <FlexWrapper mBottom={'20px'} justify={'flex-start'}>
            <H1>{t('welcome_come_back')}</H1>

            <Image source={Png.Hand} style={styles.image} />
          </FlexWrapper>

          <AuthFeatures.LoginForm />

          <AuthFeatures.SocialAuth />
        </FlexWrapper>
      </Background.Scroll>
    </Background.SafeArea>
  )
}
