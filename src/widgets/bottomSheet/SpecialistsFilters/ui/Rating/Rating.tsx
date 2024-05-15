import React from 'react'

import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, SRegular, LRegular } from '@/shared/ui/Styled/Styled'
import { t } from 'i18next'
import { styles } from './styles'
import { EColors } from '@/shared/ui/Styled'

export const Rating = () => {
  return (
    <FlexWrapper mTop="16px" align="flex-start" flexDirection="column">
      <SRegular>{t('rating')}</SRegular>
      <FlexWrapper justify="flex-start" mTop="10px" align="center">
        <Input.Checkbox mRight="10px" value={true} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <LRegular mLeft="10px" style={styles.text}>
          5
        </LRegular>
      </FlexWrapper>
      <FlexWrapper justify="flex-start" mTop="10px" align="center">
        <Input.Checkbox mRight="10px" value={false} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <LRegular mLeft="10px" style={styles.text}>
          4
        </LRegular>
      </FlexWrapper>
      <FlexWrapper justify="flex-start" mTop="10px" align="center">
        <Input.Checkbox mRight="10px" value={false} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <Icon name="Star" fill={EColors.warning} size={20} />
        <LRegular mLeft="10px" style={styles.text}>
          3
        </LRegular>
      </FlexWrapper>
    </FlexWrapper>
  )
}
