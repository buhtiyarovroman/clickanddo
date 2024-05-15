import React, { useRef } from 'react'

import { useTranslation } from 'react-i18next'

import { Input } from '@/shared/ui/input'
import { SelectTypeBottomSheet } from './components'
import { TSelectLangProps } from './types'
import { levelData } from '@/shared/config/langLevel'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const SelectType = ({
  onChange = () => {},
  value = 0,
  error,
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
        label={t('proficiency_level')}
        value={levelData.find(el => el.value === value)?.title || ''}
        onPress={onOpen}
        error={error}
      />

      <SelectTypeBottomSheet
        ref={ref}
        onClose={onClose}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
