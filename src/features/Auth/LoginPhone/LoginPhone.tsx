import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React, { useContext, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TForm } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneEmailValidation } from './validation'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { TPhoneInputRef } from '@/shared/ui/input/Phone/types'
import { AuthFeatures } from '..'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { LoaderContext } from '@/app/contexts/Loader'

export const LoginPhone = () => {
  const { t } = useTranslation()
  const phoneRef = useRef<TPhoneInputRef | null>(null)
  const { navigate } = useNavigation()
  const { setLoading } = useContext(LoaderContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(phoneEmailValidation),
    defaultValues: {
      phone: '',
    },
  })

  const onSubmit = async (data: TForm) => {
    try {
      setLoading(true)

      const phoneInfo = phoneRef.current?.getPhoneInfo()

      if (!phoneInfo?.countryCode) {
        console.error('countryCode is undefined ')
        return
      }

      await AuthFeatures.Firebase.signInWithPhone(
        phoneInfo.countryCode + data.phone,
      )

      navigate(EScreens.AuthVerifyPhone, {
        phone: phoneInfo.countryCode.replace('+', '') + data.phone,
      })
    } catch (err) {
      console.log('login email error', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FlexWrapper flexDirection={'column'}>
      <Controller
        control={control}
        name={'phone'}
        render={({ field: { value, onChange } }) => (
          <Input.Phone
            label={t('inputs.phone_title')}
            error={errors.phone?.message}
            mBottom={'20px'}
            {...{ value, onChange }}
            ref={phoneRef}
          />
        )}
      />

      <Button.Standard text={t('sign_in')} onPress={handleSubmit(onSubmit)} />
    </FlexWrapper>
  )
}
