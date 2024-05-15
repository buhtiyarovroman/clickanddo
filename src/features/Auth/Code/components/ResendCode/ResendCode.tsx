import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { TCodeLayoutsProps } from '../../types'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { AuthFeatures } from '@/features/Auth'

export const ResendCode = ({
  phone = '',
}: Pick<TCodeLayoutsProps, 'phone'>) => {
  const { t } = useTranslation()

  const [timer, setTimer] = useState(60)

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    }
  }, [timer])

  const onPressResend = () => {
    AuthFeatures.Firebase.signInWithPhone('+' + phone, true)

    setTimer(60)
  }

  const isValid = timer > 1
  return (
    <FlexWrapper mTop={'40px'}>
      {isValid && (
        <MRegular color={EColors.grey_600}>
          00:{timer >= 10 ? timer : '0' + timer}
        </MRegular>
      )}

      {!isValid && (
        <MRegular onPress={onPressResend} style={styles.resendText}>
          {t('send_code_again')}
        </MRegular>
      )}
    </FlexWrapper>
  )
}

const styles = StyleSheet.create({
  resendText: {
    textDecorationLine: 'underline',
    color: EColors.primary,
  },
})
