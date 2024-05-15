import React from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { H3SemiBold } from '@/shared/ui/Styled/Styled'
import { styles } from './styles'
import { TFaqListItem } from './types'
import { ListItem } from './ui'

export const Faq = () => {
  const { t } = useTranslation()

  const renderItem = ({
    item,
    index,
  }: {
    item: TFaqListItem
    index: number
  }) => {
    return <ListItem key={index} item={item} />
  }
  const data = [
    {
      title: t('faq.check.title'),
      description: t('faq.check.description'),
    },
    {
      title: t('faq.commission.title'),
      description: t('faq.commission.description'),
    },
    {
      title: t('faq.tips.title'),
      description: t('faq.tips.description'),
    },
    {
      title: t('faq.evaluation.title'),
      description: t('faq.evaluation.description'),
    },
  ]

  return (
    <View style={styles.wrapper}>
      <H3SemiBold mBottom="10px">{t('faq_title')}</H3SemiBold>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  )
}
