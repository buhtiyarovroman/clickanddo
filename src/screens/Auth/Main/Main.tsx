import { Background } from '@/shared/ui/background'
import React from 'react'
import { styles, WelcomeText, TextContainer } from './styled'
import { Image } from 'react-native'
import { Png } from '@assets/Png'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const Main = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const onGoLogin = () => {
    navigate(EScreens.AuthLogin)
  }

  return (
    <Background.Standard style={styles.main}>
      <Image source={Png.AuthMain} resizeMode={'cover'} style={styles.image} />

      <TextContainer>
        <FlexWrapper flexDirection={'column'} justify={'flex-start'}>
          <WelcomeText align={'center'}>
            {t('welcome')} {'\n'}
            {t('click_n_go')}
          </WelcomeText>

          <MRegular align={'center'} color={EColors.white_T2} mTop={'16px'}>
            {t('solve_problems')}
          </MRegular>
        </FlexWrapper>

        <Button.Standard
          onPress={onGoLogin}
          mTop={'36px'}
          text={t('sign_in')}
          color={EColors.white}
          textColor={EColors.primary}
        />
      </TextContainer>
    </Background.Standard>
  )
}
