import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/shared/ui/input'
import { EColors, Styled } from '@/shared/ui/Styled'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

import * as T from './types'
import * as S from './styled'
import * as C from './components'
import { createPublicationSchema } from './validation'
import { useTypedSelector } from '@/app/store'
import { getPublicationSelector } from '@/entities/Publication'
import { v4 as uuidv4 } from 'uuid'
import { Hashtags } from '@/features/Projects/Hashtags'
import { TouchableCheckbox } from './styled'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { Photos } from '@/shared/ui/Photos'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Icon } from '@/shared/ui/Icon'
import { HideLikes } from '@/shared/ui/HideLikes'

export const CreatePublicationForm = forwardRef<
  T.TCreatePublicationFormRef,
  T.TCreatePublicationFormProps
>(({}, ref) => {
  const { t } = useTranslation()
  const { createPublication } = useTypedSelector(getPublicationSelector)
  const bottomSheetRef = useRef<TBottomSheetBaseRef | null>(null)

  const onOpen = () => bottomSheetRef.current?.open()

  const {
    control,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<T.TCreatePublicationForm>({
    resolver: zodResolver(createPublicationSchema(t)),
    defaultValues: {
      coordinates: createPublication.coordinates,
      location: createPublication.location,
      title: createPublication.title,
      description: createPublication.description,
      price: +createPublication.price,
      hideLikes: createPublication.hideLikes,
      currency: createPublication.currency as TCurrencyValue,
      images: createPublication.images.length
        ? createPublication.images.map(el => ({ path: el, id: uuidv4() }))
        : [],
      hashtag: createPublication.hashtag,
    },
  })

  console.log('error =>', errors)

  useImperativeHandle(
    ref,
    () => ({
      getForm: async () => {
        handleSubmit(() => {})()

        const valid = await trigger()
        if (!valid) return null

        const values = getValues()

        return {
          images: values.images,
          coordinates: values.coordinates,
          location: values.location,
          title: values.title,
          description: values.description,
          price: values.price,
          currency: values.currency,
          hideLikes: values.hideLikes,
          hashtag: values.hashtag,
        }
      },
    }),
    [handleSubmit, getValues, trigger],
  )

  return (
    <>
      <FlexWrapper flexDirection={'column'}>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Photos
              withTitle={false}
              photos={value}
              onChange={photos => onChange(photos.slice(0, 3))}
              imageType={'publication'}
              mTop="20px"
              mBottom="20px"
              error={error?.message}
              maxFiles={3}
              multiple
              renderContent={() => (
                <S.AddImage isFirst={value.length === 0} hasError={!!error}>
                  <Icon name={'Clip'} size={18} />

                  <Styled.SRegular>{t('add')}</Styled.SRegular>
                </S.AddImage>
              )}
              imageStyle={{ width: wp(37), height: wp(37) }}
            />
          )}
          name={T.ECreatePublicationForm.images}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input.Standard
              value={value}
              onChange={onChange}
              label={t('new_publication.add_title')}
              error={error?.message}
              mBottom="20px"
            />
          )}
          name={T.ECreatePublicationForm.title}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input.TextArea
                placeholder={t('new_publication.add_description')}
                value={value}
                limit={400}
                showTextLimit
                onChange={onChange}
                error={error?.message}
              />
            </>
          )}
          name={T.ECreatePublicationForm.description}
        />

        <S.HashtagWrapper>
          <H3SemiBold>{t('offer.add_tags')}</H3SemiBold>
          <MRegular mTop="16px" mBottom="16px">
            {t(`offer.tags_description_edit`)}
          </MRegular>
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Hashtags
                selectOnUserHashtags
                hideSearchIcon
                limit={10}
                withTitle={false}
                onChange={onChange}
                hashtag={value}
                error={error?.message}
              />
            )}
            name={T.ECreatePublicationForm.hashtag}
          />
        </S.HashtagWrapper>

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Controller
              control={control}
              render={({
                field: { onChange: onChangeInput, value: priceValue },
              }) => (
                <Input.Currency
                  error={error?.message}
                  currency={value}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(+budget)
                  }}
                  value={((priceValue as number) || 0)?.toString()}
                  label={t('new_publication.price')}
                  fontSize={16}
                  mTop={'20px'}
                  mBottom="20px"
                />
              )}
              name={T.ECreatePublicationForm.price}
            />
          )}
          name={T.ECreatePublicationForm.currency}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <Input.Standard
                value={value}
                label={t('select_location')}
                leftIcon={'LocationPoint'}
                error={error?.message}
                mBottom={'20px'}
                onPress={onOpen}
                rightIcon={!!value ? 'Close' : undefined}
                rightIconProps={{
                  size: 20,
                  stroke: EColors.black,
                }}
                onPressRightIcon={() => onChange('')}
              />

              <TouchableCheckbox onPress={() => !!value && onChange('')}>
                <Input.Checkbox
                  value={!value}
                  onChange={checked => !!checked && onChange('')}
                />

                <MRegular mLeft={'5px'}>{t('remote_work')}</MRegular>
              </TouchableCheckbox>
            </>
          )}
          name={T.ECreatePublicationForm.location}
        />

        <Styled.Hr color={EColors.grey_200} mBottom="20px" mTop="20px" />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <HideLikes {...{ onChange, value }} />
          )}
          name={T.ECreatePublicationForm.hideLikes}
        />
      </FlexWrapper>

      <C.BottomSheet ref={bottomSheetRef} control={control} />
    </>
  )
})
