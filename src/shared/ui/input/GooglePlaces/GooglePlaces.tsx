import React, { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete'

import { i18n } from '@/app/i18n'
import { GOOGLE_API_KEY } from '@env'
import { useBottomSheetKeyboard, useGetMyPosition } from '@/features/hooks'

import { getFormattedAddress } from '@/shared/utils'

import { Icon } from '../../Icon'
import { EColors } from '../../Styled'
import { FlexWrapper, MRegular } from '../../Styled/Styled'

import {
  IconContainer,
  LeftButtonWrapper,
  ClearButtonWrapper,
  autocompleteStyles,
} from './styled'
import { getStyles } from './config'
import { TGooglePlaces } from './types'

export const GooglePlaces = ({
  onSelect = () => {},
  value,
  onFocus: _onFocus,
  disabled = false,
  autoGeolocation = false,
  listViewStyles,
  error,
  bottomSheetRef,
  label = '',
  leftIcon = 'Planet',
  disableFormatted = false,
  isBottomSheet = false,
  showClear = false,
}: TGooglePlaces) => {
  const { t, keys } = useTranslation()
  const ref = useRef<GooglePlacesAutocompleteRef>(null)
  const { getCurrentLocation, formattedAddress, coordinates } =
    useGetMyPosition({ disableFormatter: disableFormatted })

  useEffect(() => {
    ref.current?.setAddressText(value || '')
  }, [value])

  const isShowClear = !!value

  const { onFocus, onBlur } = useBottomSheetKeyboard({
    isBottomSheet,
  })

  const onFocusDef = () => {
    bottomSheetRef?.current?.snapToPosition('80%')
    ref.current?.setAddressText('')
    _onFocus?.()
  }

  const onBlurDef = () => {
    bottomSheetRef?.current?.collapse()

    value && ref.current?.setAddressText(value)
  }

  const onPress = (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    let formattedLocation = ''

    if (disableFormatted) {
      formattedLocation = detail?.formatted_address || ''
    } else {
      formattedLocation = getFormattedAddress(detail?.address_components)
    }

    const location = detail?.geometry.location

    if (formattedLocation) {
      ref.current?.setAddressText(formattedLocation)
      onSelect?.(formattedLocation, location)
    }
  }

  const onPressLocation = async () => {
    let result

    if (!formattedAddress) {
      result = await getCurrentLocation()
    }
    if (formattedAddress) {
      result = { formattedAddress }

      if (coordinates) {
        result = { formattedAddress, coordinates }
      }
    }

    if (result) {
      ref.current?.setAddressText(result.formattedAddress)

      onSelect?.(
        result.formattedAddress,
        result.coordinates
          ? {
              lat: result.coordinates?.latitude,
              lng: result.coordinates?.longitude,
            }
          : undefined,
      )
    }
  }

  useEffect(() => {
    if (!autoGeolocation) return

    onPressLocation()
  }, [autoGeolocation])

  const onClearValue = () => {
    ref.current?.setAddressText('')
    onSelect?.('', undefined)
  }

  return (
    <FlexWrapper
      style={disabled ? autocompleteStyles.disabled : {}}
      flexDirection={'column'}
      mBottom={'16px'}>
      <GooglePlacesAutocomplete
        ref={ref}
        debounce={300}
        minLength={2}
        fetchDetails={true}
        nearbyPlacesAPI={'GoogleReverseGeocoding'}
        placeholder={label}
        keyboardShouldPersistTaps={'always'}
        onPress={onPress}
        textInputProps={{
          placeholderTextColor: EColors.grey_600,
          clearButtonMode: 'never',
          onFocus: isBottomSheet ? onFocus : onFocusDef,
          onBlur: isBottomSheet ? onBlur : onBlurDef,
          editable: !disabled,
          autoCorrect: false,
          spellCheck: false,
          keyboardAppearance: 'light',
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: i18n.language,
          // types: 'establishment|geocode',
          types: disableFormatted ? 'establishment|geocode' : '(cities)',
        }}
        enablePoweredByContainer={false}
        styles={getStyles({ listViewStyles })}
        renderLeftButton={() => (
          <LeftButtonWrapper>
            <IconContainer leftIcon={leftIcon}>
              <Icon name={leftIcon} />
            </IconContainer>
          </LeftButtonWrapper>
        )}
        renderRightButton={() => (
          <>
            {isShowClear && (
              <ClearButtonWrapper
                onPress={() => onClearValue()}
                disabled={disabled}>
                <Icon
                  fill={EColors.black}
                  size={20}
                  name={'Close'}
                  stroke={EColors.black}
                />
              </ClearButtonWrapper>
            )}
            {!isShowClear && (
              <ClearButtonWrapper
                onPress={() => onPressLocation()}
                disabled={disabled}>
                <Icon
                  fill={EColors.black}
                  size={24}
                  name={'Location'}
                  stroke={EColors.transparent}
                />
              </ClearButtonWrapper>
            )}
          </>
        )}
      />

      {error && (
        <FlexWrapper justify={'flex-start'}>
          <MRegular color={EColors.error} mTop={'5px'}>
            {t(error as keyof typeof keys)}
          </MRegular>
        </FlexWrapper>
      )}
    </FlexWrapper>
  )
}
