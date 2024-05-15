import { Background } from '@/shared/ui/background'
import React from 'react'
import { styles } from './styled'
import { Trans, useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'
import { H1, MRegular, MSemibold } from '@/shared/ui/Styled/Styled'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TAuthStack } from '@/app/navigation/stacks/Auth'
import { EScreens } from '@/app/navigation'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { useNavigation } from '@/features/hooks'

export const EmailSended = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { email } =
    useRoute<RouteProp<TAuthStack, EScreens.AuthEmailSended>>().params

  const onBackAuth = () => {
    navigate(EScreens.AuthLogin)
  }

  return (
    <>
      <Background.Standard style={styles.main} pHorizontal={20}>
        <Icon name={'EmailSended'} size={275} />
        <H1 mTop={'50px'}>{t('verification_email')}</H1>
        <MRegular mTop={'12px'} align={'center'} color={EColors.grey_600}>
          <Trans
            i18nKey={'verification_email_description'}
            values={{ email: email }}
            components={{ bold: <MSemibold /> }}
          />
        </MRegular>

        <Button.Standard
          text={t('return_auth')}
          mTop={'32px'}
          onPress={onBackAuth}
        />
      </Background.Standard>
    </>
  )
}
