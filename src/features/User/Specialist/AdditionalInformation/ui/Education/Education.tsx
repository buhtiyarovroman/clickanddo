import { EColors } from '@/shared/ui/Styled'
import { MRegular, FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TAddInfoEducationProps } from './types'
import { TUserEducation } from '@/entities/User/models'
import { AddChangeButtons } from '../AddChangeButtons'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { format } from 'date-fns'
import { View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { Line } from '../../styled'
import { ShowMore } from '../ShowMore'

export const Education = ({
  isEdit,
  education = [],
}: TAddInfoEducationProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const isVisible = education.length || isEdit

  const renterEducation = (item: TUserEducation) => {
    return (
      <ShowMore
        key={uuidv4()}
        name={item.name}
        times={`${
          item.from ? format(new Date(item.from), 'yyyy') : t('current_time')
        } - ${item.to ? format(new Date(item.to), 'yyyy') : t('current_time')}`}
      />
    )
  }

  const onEditNavigate = () => {
    navigate(EScreens.ProfileAddInfoEducation, { isEdit: true })
  }

  return (
    <>
      {isVisible && (
        <FlexWrapper flexDirection={'column'} mBottom={'16px'}>
          <FlexWrapper mBottom={'16px'} justify={'space-between'}>
            <LSemibold>{t('education')}</LSemibold>

            {isEdit && (
              <AddChangeButtons onEditPress={onEditNavigate} hideAdd />
            )}
          </FlexWrapper>

          {education.map(renterEducation)}
        </FlexWrapper>
      )}
    </>
  )
}
