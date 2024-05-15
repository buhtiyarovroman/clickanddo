import React from 'react'
import { ButtonContainer } from './styled'
import { TDrawerButtonProps } from './types'
import { Icon } from '@/shared/ui/Icon'
import { Hr, LRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'

export const DrawerButton = ({
  icon,
  text,
  bottomLine = false,
  onPress,
}: TDrawerButtonProps) => {
  const { t } = useTranslation()

  return (
    <>
      <ButtonContainer onPress={onPress}>
        <Icon name={icon} />

        <LRegular color={EColors.grey_700} mLeft={'10px'}>
          {t(text)}
        </LRegular>
      </ButtonContainer>

      {bottomLine && (
        <Hr color={EColors.grey_200} mTop={'12px'} mBottom={'12px'} />
      )}
    </>
  )
}
