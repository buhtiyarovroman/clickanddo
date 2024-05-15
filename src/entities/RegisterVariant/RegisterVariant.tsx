import React from 'react'
import { TRegisterVariantProps } from './types'
import { ImageContainer, styles } from './styled'
import {
  FlexWrapper,
  H3SemiBold,
  LMedium,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'

export const RegisterVariant = ({
  image,
  title,
  description,
  onPress,
}: TRegisterVariantProps) => {
  const { t } = useTranslation()
  return (
    <ImageContainer source={image}>
      <FlexWrapper width={'50%'} flexDirection={'column'} align={'flex-start'}>
        <H3SemiBold>{title}</H3SemiBold>

        <SRegular color={EColors.grey_600} mTop={'8px'}>
          {description}
        </SRegular>

        <Button.Standard
          style={styles.button}
          mTop={'27px'}
          height={'auto'}
          color={EColors.black}
          onPress={onPress}>
          <LMedium color={EColors.white} mRight={'5px'}>
            {t('go')}
          </LMedium>
          <Icon name={'ArrowRight'} size={14} />
        </Button.Standard>
      </FlexWrapper>
    </ImageContainer>
  )
}
