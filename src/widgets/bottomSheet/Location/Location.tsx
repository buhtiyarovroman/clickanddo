import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { FlexWrapper, H3SemiBold, Hr } from '@/shared/ui/Styled/Styled'

import * as S from './styled'
import { TLocationBottSheetProps, TPressAddress } from './types'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { useSearchPlace } from '@/features/hooks'
import * as UI from './ui'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { TPredictionPlace } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'
import { Button } from '@/shared/ui/button'

export const Location = forwardRef<
  TBottomSheetBaseRef,
  TLocationBottSheetProps
>(({ onClose = () => {}, onSelectAddress = () => {}, goToMap }, ref) => {
  const { t } = useTranslation()

  const { search, setSearch, places } = useSearchPlace()

  const isEmpty = !places.length

  const onGetPlace = async (place_id: string, address: string) => {
    try {
      const data = await UserService.getGoogleGeometry({ place_id })

      const location = data.data.result.geometry.location

      if (location.lat && location.lng) {
        onSelectAddress({
          radius: 15,
          lat: location.lat,
          lon: location.lng,
          address: address,
        })

        onClose()
      }
    } catch (error) {
      console.log('onGetPlace error =>', error)
    }
  }

  const onDefaultSelect = (value: TPressAddress) => {
    onSelectAddress({
      radius: value.radius,
      lat: value.lat,
      lon: value.lon,
      address: value.address,
      needTranslate: value.needTranslate,
    })

    console.log('addreesss =>', {
      radius: value.radius,
      lat: value.lat,
      lon: value.lon,
      address: value.address,
      needTranslate: value.needTranslate,
    })

    onClose()
  }

  const renderItem = (item: TPredictionPlace) => (
    <UI.PlaceItem place={item} onPress={onGetPlace} />
  )

  return (
    <BottomSheet.Base snapPoints={['90%']} ref={ref}>
      <S.Container>
        <FlexWrapper>
          <S.Absolute onPress={onClose}>
            <Icon name={'AngleArrowLeft'} stroke={EColors.black} />
          </S.Absolute>
          <H3SemiBold>{t('location')}</H3SemiBold>
        </FlexWrapper>

        <Hr color={EColors.grey_200} mTop={'20px'} mBottom={'20px'} />

        <S.ContentContainer>
          <Input.Search
            value={search}
            onChange={setSearch}
            label={t('find_location')}
          />

          <BottomSheetScrollView>
            {!isEmpty && places.map(renderItem)}

            {isEmpty && <UI.DefaultList onSelect={onDefaultSelect} />}
          </BottomSheetScrollView>
        </S.ContentContainer>

        {!!goToMap && (
          <S.BContainer>
            <Button.Standard text={t('open')} onPress={goToMap} />
          </S.BContainer>
        )}
      </S.Container>
    </BottomSheet.Base>
  )
})
