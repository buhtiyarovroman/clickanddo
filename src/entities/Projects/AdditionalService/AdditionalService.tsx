import React from 'react'
import { TProjectPreviewAdditionalServiceProps } from './types'
import {
  FlexWrapper,
  H3SemiBold,
  Hr,
  MRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { HashtagDisplay } from '../HashtagDisplay'
import { useTranslation } from 'react-i18next'

export const AdditionalService = ({
  additionalService,
}: TProjectPreviewAdditionalServiceProps) => {
  const { t } = useTranslation()
  const isValid = additionalService?.name && additionalService.description
  return (
    <>
      {additionalService && isValid && (
        <>
          <H3SemiBold mBottom={'16px'}>{t('additional_services')}</H3SemiBold>
          <FlexWrapper flexDirection={'column'} align={'flex-start'}>
            <HashtagDisplay hashtag={additionalService.hashtag} />

            <H3SemiBold mBottom={'10px'}>{additionalService.name}</H3SemiBold>

            <MRegular color={EColors.grey_500}>
              {additionalService.description}
            </MRegular>
          </FlexWrapper>

          <Hr mTop={'20px'} mBottom={'20px'} color={EColors.grey_400} />
        </>
      )}
    </>
  )
}
