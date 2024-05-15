import { Input } from '@/shared/ui/input'
import React, { useRef } from 'react'
import { TProjectDateTime } from './types'
import { format } from 'date-fns'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { DateBottomSheet } from '@/widgets/bottomSheet/Date'
import { useTranslation } from 'react-i18next'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const DateTime = ({
  date,
  setDate = () => {},
  title = '',
  maximumDate,
  minimumDate,
  defaultDate,
  ...props
}: TProjectDateTime) => {
  const { t } = useTranslation()
  const dateRef = useRef<TBottomSheetBaseRef | null>(null)
  const timeRef = useRef<TBottomSheetBaseRef | null>(null)

  const onOpenModal = (type: 'date' | 'time') => {
    if (type === 'date') {
      dateRef.current?.open()
    }
    if (type === 'time') {
      timeRef.current?.open()
    }
  }

  const currentTitleDate = date
    ? format(new Date(date), 'dd MMMM yyyy', {
        locale: dateLocale[i18next.language],
      })
    : ''

  const currentTitleTime = date
    ? format(new Date(date), 'HH:mm', {
        locale: dateLocale[i18next.language],
      })
    : ''

  const currentDate = date ? new Date(date) : defaultDate || new Date()

  return (
    <>
      {title && <MRegular mBottom={'5px'}>{title}</MRegular>}
      <FlexWrapper {...props} justify={'space-between'}>
        <Input.Touchable
          leftIcon={'Calendar'}
          onPress={() => onOpenModal('date')}
          value={currentTitleDate}
          width={'60%'}
          label={t('unspecified')}
          disableRightIcon
        />

        <Input.Touchable
          onPress={() => onOpenModal('time')}
          leftIcon={'Clock'}
          value={currentTitleTime}
          width={'35%'}
          label={'00:00'}
          disableRightIcon
        />
      </FlexWrapper>

      <DateBottomSheet
        ref={dateRef}
        dateValue={currentDate}
        setDate={dateDate => setDate(dateDate.toString())}
        minimumDate={minimumDate || new Date()}
        {...{ maximumDate }}
      />
      <DateBottomSheet
        locale={'ua'}
        mode={'time'}
        ref={timeRef}
        dateValue={currentDate}
        minimumDate={minimumDate}
        setDate={timeDate => setDate(timeDate.toString())}
      />
    </>
  )
}
