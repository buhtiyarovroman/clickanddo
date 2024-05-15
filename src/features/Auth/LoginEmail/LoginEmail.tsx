import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TForm } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginEmailValidation } from './validation'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { LoaderContext } from '@/app/contexts/Loader'
import { Sentry } from '@/shared/lib'
import { AuthFeatures } from '..'

export const LoginEmail = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { setLoading } = useContext(LoaderContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(loginEmailValidation),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: TForm) => {
    try {
      setLoading(true)
      console.log('work submit email')
      await AuthFeatures.Firebase.signInWithEmail(data.email)

      navigate(EScreens.AuthEmailSended, { email: data.email })
    } catch (error) {
      console.log('onPressContinueEmail error =>', error)
      Sentry.captureException('email send error => ' + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FlexWrapper flexDirection={'column'}>
      <Controller
        control={control}
        name={'email'}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('inputs.email')}
            error={errors.email?.message}
            mBottom={'20px'}
            autoComplete={'email'}
            {...renderProps}
          />
        )}
      />

      <Button.Standard text={t('sign_in')} onPress={handleSubmit(onSubmit)} />
    </FlexWrapper>
  )
}
