import React from 'react'
import { ProjectContainer } from './styled'
import { TResponseCardProps } from './types'
import { Buttons, Head } from './ui'
import { MoreText } from '@/shared/ui/MoreText'
import { FlexWrapper, LMedium, LRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const ResponseCard = ({
  description,
  isCustomer = false,
  projectId = '',
  disableButton = false,
  onRefresh = () => {},
  onPress = () => {},
  price = 0,
  ...props
}: TResponseCardProps) => {
  const { t } = useTranslation()
  const { setting } = useTypedSelector(getUserSelector)

  return (
    <ProjectContainer onPress={onPress} {...props}>
      <Head {...props} />

      {!!description && (
        <FlexWrapper justify={'flex-start'} mTop={'20px'}>
          <MoreText value={description} />
        </FlexWrapper>
      )}

      {!!price && (
        <FlexWrapper mTop={'12px'} justify={'space-between'}>
          <LRegular color={EColors.grey_500}>{t('price')}</LRegular>

          <LMedium>
            {price.toFixed(0)} {setting.currency}
          </LMedium>
        </FlexWrapper>
      )}

      {isCustomer && !disableButton && (
        <Buttons {...props} _id={projectId} onRefresh={onRefresh} />
      )}
    </ProjectContainer>
  )
}
