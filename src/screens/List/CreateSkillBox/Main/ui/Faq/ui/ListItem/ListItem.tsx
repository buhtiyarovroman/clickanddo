import React, { useState } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Icon } from '@/shared/ui/Icon'
import { TFaqListItemProps } from './types'
import {
  FlexWrapper,
  LSemibold,
  MMedium,
  MRegular,
} from '@/shared/ui/Styled/Styled'
import { styles } from './styles'
import { EColors } from '@/shared/ui/Styled'

export const ListItem = ({ item }: TFaqListItemProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(prev => !prev)
  return (
    <TouchableWithoutFeedback onPress={toggleOpen}>
      <View style={styles.wrapper}>
        <LSemibold mBottom="15px">{item.title}</LSemibold>
        <MRegular numberOfLines={open ? undefined : 3}>
          {item.description}
        </MRegular>
        <FlexWrapper mTop="15px" width="100%" justify="flex-start">
          <MMedium color={EColors.primary_D2} mRight="5px" align="left">
            {open ? t('collapse') : t('read_more')}
          </MMedium>
          <View style={open ? styles.openIcon : {}}>
            <Icon
              fill={EColors.transparent}
              color={EColors.primary_D2}
              name="AngleArrowDown"
              size={16}
            />
          </View>
        </FlexWrapper>
      </View>
    </TouchableWithoutFeedback>
  )
}
