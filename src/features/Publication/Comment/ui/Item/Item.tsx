import {
  FlexWrapper,
  MRegular,
  SRegular,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import React from 'react'
import { TPublicationCommentItemProps } from './types'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { EColors } from '@/shared/ui/Styled'
import { View } from 'react-native'
import { Image } from '@/shared/ui/image'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'

export const Item = ({
  _id,
  comment = '',
  createdAt = new Date().toString(),
  owner,
  onPressReplayTo = () => {},
  replyTo,
}: TPublicationCommentItemProps) => {
  const { t } = useTranslation()
  const dateObject = parseISO(createdAt)
  const distanceString = formatDistanceToNow(dateObject, {
    locale: dateLocale[i18next.language],
  })

  const _onPressReplayTo = () => {
    if (!_id) {
      console.log('Comment no owner')
      return
    }

    onPressReplayTo({
      _id: _id,
      name: `${owner?.name || ''} ${owner?.secondName || ''}`,
    })
  }

  return (
    <FlexWrapper
      mTop="16px"
      style={styles.comment_item_wrapper}
      align="flex-start">
      <View style={styles.avatar}>
        <Image.Standard
          type="user"
          source={owner?.photo}
          width="100%"
          height="100%"
        />
      </View>
      <FlexWrapper mLeft="10px" flexDirection="column" align="flex-start">
        <FlexWrapper width={'auto'}>
          <MRegular color={EColors.grey_800}>
            {owner?.name || ''} {owner?.secondName || ''}{' '}
          </MRegular>
          <SRegular color={EColors.grey_600}>{distanceString}</SRegular>
        </FlexWrapper>
        <MRegular style={styles.comment_text}>{comment}</MRegular>
        {!replyTo && (
          <Touchable onPress={_onPressReplayTo} width={'auto'}>
            <MRegular color={EColors.primary}>{t('reply_to')}</MRegular>
          </Touchable>
        )}
      </FlexWrapper>
    </FlexWrapper>
  )
}
