import React, { useRef } from 'react'

import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/ui/input'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

import { TSelectLangProps } from './types'
import { SelectBottomSheet } from './components'

export const SelectLang = ({
  onChange = () => {},
  value = '',
  error,
  languages = [],
}: TSelectLangProps) => {
  const { t } = useTranslation()
  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const onOpen = () => {
    ref.current?.open()
  }
  const onClose = () => {
    ref.current?.close()
  }

  return (
    <>
      <Input.Touchable
        label={t('select_language')}
        value={value}
        onPress={onOpen}
        mBottom={'16px'}
        error={error}
      />

      <SelectBottomSheet
        ref={ref}
        onClose={onClose}
        value={value}
        onChange={onChange}
        languages={languages}
      />
    </>
  )
}
