import React, { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import i18next, { t } from 'i18next'
import { format } from 'date-fns'

import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  MRegular,
  LSemibold,
  SRegular,
  LRegular,
} from '@/shared/ui/Styled/Styled'
import { dateLocale, getTranslate } from '@/shared/utils'
import { styles } from '../styles'
import { TInfoProps } from './types'
import { HashtagItem, StyledPrice } from './styles'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { THashTag } from '@/entities/User/models'

export const Info = ({ publication, type }: TInfoProps) => {
  const date = !!publication.createdAt
    ? new Date(publication.createdAt)
    : new Date()

  const { setting } = useTypedSelector(getUserSelector)

  const [openDescription, setOpenDescription] = useState(false)
  const [formattedDate, setFormattedDate] = useState('')
  const dayOfMonth = date.getDate()
  const monthName = format(date, 'MMMM', {
    locale: dateLocale[i18next.language],
  })

  const toggleOpenDescription = () => setOpenDescription(prev => !prev)

  useEffect(() => {
    if (type !== 'publication') {
      const current = !!publication?.relevantUntil
        ? new Date(publication?.relevantUntil)
        : new Date()
      setFormattedDate(format(current, 'dd MMM yyyy'))
    } else {
      setFormattedDate('')
    }
  }, [])

  const renderHashtags = (item: THashTag) => (
    <HashtagItem key={item._id}>
      <MRegular color={EColors.white}>
        {getTranslate(item.title || [])}
      </MRegular>
    </HashtagItem>
  )

  const filterHashtag = () => {
    if (!openDescription && publication.hashtag.length > 3) {
      return publication.hashtag.slice(0, 3)
    }

    return publication.hashtag
  }

  const renderShowMore = () => (
    <TouchableOpacity onPress={() => setOpenDescription(!openDescription)}>
      <MRegular mLeft={'10px'}>
        {t(openDescription ? 'show_less_skills' : 'show_all_skills')}
      </MRegular>
    </TouchableOpacity>
  )

  console.log('price =>', publication.price)

  return (
    <>
      {!!publication.address && (
        <FlexWrapper justify="flex-start" style={styles.section}>
          <Icon name="PinAlt" size={20} fill={EColors.grey_700} />
          <MRegular mLeft="10px">{publication?.address}</MRegular>
        </FlexWrapper>
      )}

      <FlexWrapper style={styles.section_info}>
        <LSemibold>{publication?.heading}</LSemibold>
        <FlexWrapper wrap="wrap" mTop="10px" justify="flex-start">
          {filterHashtag().map(renderHashtags)}
          {publication.hashtag.length > 3 && renderShowMore()}
        </FlexWrapper>

        <TouchableWithoutFeedback onPress={toggleOpenDescription}>
          <FlexWrapper
            width="100%"
            mTop="12px"
            align="flex-end"
            justify="flex-start">
            <LRegular
              style={styles.description}
              align="left"
              color={EColors.grey_600}>
              {publication?.description}
            </LRegular>
          </FlexWrapper>
        </TouchableWithoutFeedback>
        <FlexWrapper justify="space-between" align="flex-end">
          <FlexWrapper justify="flex-start" width="50%">
            {!publication.hideLikes && (
              <>
                <MRegular color={EColors.grey_600}>{t('likes')}:</MRegular>
                <MRegular color={EColors.grey_800} mLeft="5px">
                  {publication?.likes}
                </MRegular>
              </>
            )}
          </FlexWrapper>
          <SRegular color={EColors.grey_600}>
            {dayOfMonth + ' ' + monthName}
          </SRegular>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper style={styles.section_info}>
        {type === 'special-offer' && (
          <FlexWrapper width="100%" justify="space-between" align="flex-end">
            <LRegular color={EColors.grey_600}>{t('price_range')}:</LRegular>
            <StyledPrice>
              {(publication?.minPrice || 0).toFixed(0)} {setting.currency} -{' '}
              {(publication?.maxPrice || 0).toFixed(0)} {setting.currency}
            </StyledPrice>
          </FlexWrapper>
        )}
        {(type === 'skillbox' || type === 'special-offer') && (
          <FlexWrapper
            width="100%"
            mTop={type === 'special-offer' ? '12px' : '0px'}
            justify="space-between"
            align="flex-end">
            <LRegular color={EColors.grey_600}>{t('duration')}:</LRegular>
            <MRegular>
              {t('up_to_hours', {
                hours: publication?.duration || 0,
              })}
            </MRegular>
          </FlexWrapper>
        )}

        {type === 'skillbox' && (
          <FlexWrapper
            width="100%"
            mTop="12px"
            justify="space-between"
            align="flex-end">
            <LRegular color={EColors.grey_600}>{t('price')}:</LRegular>
            <FlexWrapper align="flex-end" justify="flex-end" width="70%">
              <MRegular
                color={EColors.grey_600}
                style={styles.text_line_through}>
                {publication?.oldPrice !== publication?.price &&
                  (publication?.oldPrice || 0).toFixed(0) +
                    ' ' +
                    setting.currency}
              </MRegular>

              <LRegular mLeft="6px">
                {(publication?.price || 0).toFixed(0)} {setting.currency}
              </LRegular>
            </FlexWrapper>
          </FlexWrapper>
        )}
        {type === 'special-offer' && (
          <FlexWrapper
            width="100%"
            mTop="12px"
            justify="space-between"
            align="flex-end">
            <LRegular color={EColors.grey_600}>{t('offer_deadline')}:</LRegular>
            <FlexWrapper align="flex-end" justify="flex-end" width="50%">
              <LRegular>{formattedDate}</LRegular>
            </FlexWrapper>
          </FlexWrapper>
        )}
        {type === 'publication' && (
          <FlexWrapper width="100%" justify="space-between" align="flex-end">
            <LRegular color={EColors.grey_600}>
              {t('approximate_price')}:
            </LRegular>
            <MRegular>
              {!!publication.price &&
                `${(publication.price || 0).toFixed(0)} ${setting.currency}`}

              {!publication.price && t('price_negotiable')}
            </MRegular>
          </FlexWrapper>
        )}
      </FlexWrapper>
    </>
  )
}
