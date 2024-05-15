import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Input } from '@/shared/ui/input'
import { Styled } from '@/shared/ui/Styled'
import { BottomSheet as BS } from '@/shared/ui/bottomSheet'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

import * as S from './styled'
import { TLocationProps } from './types'

export const BottomSheet = forwardRef<TBottomSheetBaseRef, TLocationProps>(
  ({ control }, ref) => {
    const { t } = useTranslation()

    const bottomSheetRef = useRef<TBottomSheetBaseRef>(null)

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.open()
      },
      close: () => {
        bottomSheetRef.current?.close()
      },
    }))

    const onClose = () => {
      bottomSheetRef.current?.close()
    }

    return (
      <BS.Base ref={bottomSheetRef} snapPoints={['80%']} isList>
        <KeyboardAwareScrollView
          extraScrollHeight={0}
          enableOnAndroid={true}
          enableAutomaticScroll={false}
          keyboardShouldPersistTaps={'handled'}
          bounces={false}>
          <FlexWrapper
            flexDirection="column"
            align="flex-start"
            style={{ paddingHorizontal: 20 }}>
            <Styled.H3SemiBold mTop={'24px'} mBottom={'16px'}>
              {t('new_publication.places')}
            </Styled.H3SemiBold>

            <S.Scroll keyboardShouldPersistTaps={'handled'} bounces={false}>
              <Controller
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Controller
                    control={control}
                    render={({ field: { onChange: onChangeCoords } }) => (
                      <Input.GooglePlaces
                        label={t('search')}
                        leftIcon={'LocationPoint'}
                        onSelect={(address, coords) => {
                          onChange(address)
                          onClose()

                          if (!coords) {
                            onChangeCoords([])
                            return
                          }
                          if (coords) onChangeCoords([coords?.lng, coords?.lat])
                        }}
                        value={value}
                        error={error?.message}
                        onClear={() => onChange('')}
                        isBottomSheet
                      />
                    )}
                    name={'coordinates'}
                  />
                )}
                name={'location'}
              />
            </S.Scroll>
          </FlexWrapper>
        </KeyboardAwareScrollView>
      </BS.Base>
    )
  },
)
