import { Input } from '@/shared/ui/input'
import { FlexWrapper, MSemibold } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const PriceRange = () => {
  const { t } = useTranslation()

  return (
    <FlexWrapper flexDirection={'column'} align={'flex-start'}>
      <Input.Range />
    </FlexWrapper>
  )
}
