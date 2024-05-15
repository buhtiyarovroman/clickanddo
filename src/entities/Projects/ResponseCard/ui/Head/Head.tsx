import React from 'react'
import { TResponseCardHeadProps } from './types'
import { FlexWrapper, LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { styles, UserImage, SpecialistContainer } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { format, isToday, isYesterday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'

export const Head = ({
  title = '',
  photo = '',
  name = '',
  secondName = '',
  date = new Date().toString(),
  disableDate = false,
  onPressUser = () => {},
  specialist,
}: TResponseCardHeadProps) => {
  const { t } = useTranslation()
  const formattingDate = new Date(date)

  const today = isToday(formattingDate)
  const yesterday = isYesterday(formattingDate)

  const dateFormat =
    today || yesterday
      ? format(formattingDate, 'HH:mm')
      : format(formattingDate, 'dd MMMM yyyy', {
          locale: dateLocale[i18next.language],
        })
  const dateString = today ? t('today') : yesterday ? t('yesterday') : ''
  const currentDate = `${dateString} ${dateFormat}`

  return (
    <FlexWrapper flexDirection={'column'}>
      {!!title && (
        <FlexWrapper mBottom={'16px'} justify={'space-between'}>
          <LSemibold numberOfLines={1}>{title}</LSemibold>
        </FlexWrapper>
      )}

      <FlexWrapper justify={'space-between'}>
        <SpecialistContainer onPress={onPressUser}>
          <UserImage source={photo} />

          <SRegular style={styles.text} numberOfLines={1} mLeft={'10px'}>
            {name} {secondName}
          </SRegular>
        </SpecialistContainer>

        {!disableDate && (
          <SRegular color={EColors.grey_500}>{currentDate}</SRegular>
        )}
      </FlexWrapper>
    </FlexWrapper>
  )
}
