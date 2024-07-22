import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import Toast from 'react-native-toast-message'

import { useTypedSelector } from '@/app/store'
import { getSkillBoxSelector } from '@/entities/Skillbox'
import { Input } from '@/shared/ui/input'
import {
  FlexWrapper,
  H3SemiBold,
  LSemibold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { createSkillBoxFirstValidation } from './validation'
import { styles } from '../styles'
import {
  ESkillBoxCreateFirstFormFields,
  TForm,
  TSkillBoxCreateFirstFormRef,
  TSkillBoxFirstFormProps,
} from './types'
import { Photos } from '@/shared/ui/Photos'
import { Hashtags } from '@/features/Projects/Hashtags'
import { HideLikes } from '@/shared/ui/HideLikes'

const maxSizeMB = 200

export const FirstForm = forwardRef<
  TSkillBoxCreateFirstFormRef,
  TSkillBoxFirstFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()

  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)

  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSkillBoxFirstValidation),
    defaultValues: {
      [ESkillBoxCreateFirstFormFields.tags]: createSkillBox.hashtag,
      [ESkillBoxCreateFirstFormFields.photos]: createSkillBox.photos.map(
        item => ({
          path: item,
          id: uuidv4(),
        }),
      ),
      [ESkillBoxCreateFirstFormFields.title]: createSkillBox.title,
      [ESkillBoxCreateFirstFormFields.hideLikes]: createSkillBox.hideLikes,
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  const onValidate = (image: ImageOrVideo) => {
    const sizeMB = image.size * 0.000001

    if (sizeMB > maxSizeMB) {
      Toast.show({ type: 'error', text1: t('errors.photo_size') })
      return false
    }

    return true
  }

  const handleOnChangeValid = () => {
    if (
      !getValues().title ||
      !getValues().tags.length ||
      getValues().photos.length === 0
    ) {
      onChangeValid(false)
    } else {
      onChangeValid(true)
    }
  }

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid, onChangeValid])

  return (
    <>
      <View style={{ ...styles.section, ...styles.section_first }}>
        <H3SemiBold>{t('title')}</H3SemiBold>
        <MRegular mTop="16px">{t('offer.benefit')}</MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              mTop="16px"
              label={t('offer.create_title')}
              value={value}
              onChange={e => {
                onChange(e)
                handleOnChangeValid()
              }}
              error={errors.title?.message}
            />
          )}
          name={ESkillBoxCreateFirstFormFields.title}
        />
      </View>
      <View style={styles.section}>
        <H3SemiBold>{t('offer.add_tags')}</H3SemiBold>
        <MRegular mTop="16px" mBottom="16px">
          {t('offer.tags_description')}
        </MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Hashtags
              selectOnUserHashtags
              limit={10}
              withTitle={false}
              onChange={onChange}
              hashtag={value}
              error={errors.tags?.message}
            />
          )}
          name={ESkillBoxCreateFirstFormFields.tags}
        />
      </View>
      <View style={styles.section}>
        <View>
          <LSemibold>{t('add_photos')}</LSemibold>
          <MRegular mTop="8px">{t('offer.up_to_20')}</MRegular>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              handleOnChangeValid()
              return (
                <>
                  {value.length !== 0 && (
                    <Photos
                      withTitle={false}
                      photos={value}
                      onChange={onChange}
                      imageType={'publication'}
                      multiple
                      maxFiles={20}
                      mBottom={'20px'}
                    />
                  )}
                  {value.length === 0 && (
                    <Input.PhotoMenu
                      cropping
                      onValidate={onValidate}
                      multiple
                      maxFiles={20}
                      onGetPhotoArrayPath={path => {
                        setValue(
                          ESkillBoxCreateFirstFormFields.photos,
                          path.map(item => ({ id: uuidv4(), path: item })),
                        )
                        onChangeValid(true)
                      }}
                      renderContent={() => (
                        <FlexWrapper mBottom={'20px'} style={styles.photo_card}>
                          <Icon
                            fill={EColors.grey_400}
                            name="Camera"
                            size={30}
                          />
                          <LSemibold mTop="8px">
                            {t('offer.attach_photo')}
                          </LSemibold>
                          <SRegular mTop="8px">
                            {t('offer.supported_formats')}
                          </SRegular>
                          <SRegular>{t('offer.formats')}</SRegular>
                        </FlexWrapper>
                      )}
                    />
                  )}
                </>
              )
            }}
            name={ESkillBoxCreateFirstFormFields.photos}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <HideLikes {...{ onChange, value }} />
            )}
            name={ESkillBoxCreateFirstFormFields.hideLikes}
          />
        </View>
      </View>
    </>
  )
})
