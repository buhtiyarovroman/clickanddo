import React, { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { TCodeLayoutsProps } from '../../types'
import auth from '@react-native-firebase/auth'
import { LoaderContext } from '@/app/contexts/Loader'
import { AuthFeatures } from '@/features/Auth'
import { Sentry } from '@/shared/lib'
import { FlexWrapper, LRegular, LSemibold } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const CodeView = ({
  isConfirm = false,
  onConfirmCode = () => {},
  phone = '',
}: TCodeLayoutsProps) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const [code, setCode] = useState('')

  const onVerifyCode = async () => {
    setLoading(true)
    try {
      if (isConfirm) {
        const user = await auth().currentUser
        if (!user) {
          throw Error('No user for confirm phone')
        }

        AuthFeatures.Firebase.linkPhoneNumber(code)
          .then(() => {
            setLoading(false)
            onConfirmCode()
          })
          .catch(e => {
            console.log('linkPhone number', e)

            AuthFeatures.Firebase.validateError(e)

            Sentry.captureException(e)
            setLoading(false)
          })

        return
      }

      AuthFeatures.Firebase.confirmCode(code)
        .then(async () => {
          onConfirmCode()
        })
        .catch(e => {
          AuthFeatures.Firebase.validateError(e)

          console.log('confirmCode', e.response.data)
          Sentry.captureException(e)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      console.log('verify error =>', error)
      Sentry.captureException(error)
    }
  }

  const isValid = code.length !== 6

  // Listen auto auth
  // useEffect(() => {
  //   Service.Firebase.subscribe(async user => {
  //     if (!isFocused) return
  //     if (!user?.phoneNumber) return

  //     onConfirmCode()
  //   })

  //   return () => {
  //     Service.Firebase.unsubscribe()
  //   }
  // }, [onConfirmCode, isFocused])

  return (
    <FlexWrapper flexDirection={'column'}>
      <LRegular mBottom={'24px'} align={'center'}>
        <Trans
          i18nKey={'phone_code_sended'}
          values={{ phone: `+${phone}` }}
          components={{ bold: <LSemibold /> }}
        />
      </LRegular>

      <Input.Code value={code} onChange={setCode} />

      <Button.Standard
        disabled={isValid}
        style={styles.main}
        text={t('confirm')}
        onPress={onVerifyCode}
      />
    </FlexWrapper>
  )
}

const styles = StyleSheet.create({
  main: {
    width: 177,
    borderRadius: 40,
    marginTop: 24,
  },
})
