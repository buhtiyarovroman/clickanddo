import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TAddInfoEducationProps } from './types'
import { TUserWork } from '@/entities/User/models'
import { AddChangeButtons } from '../AddChangeButtons'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { format } from 'date-fns'
import { ShowMore } from '../ShowMore'
import { v4 as uuidv4 } from 'uuid'
import { Line } from '../../styled'

export const Work = ({ isEdit, work = [] }: TAddInfoEducationProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const isVisible = work.length || isEdit

  const renterEducation = (item: TUserWork) => {
    return (
      <ShowMore
        key={uuidv4()}
        name={item.name}
        times={`${format(
          new Date(item.from || new Date().toISOString()),
          'yyyy',
        )} - ${
          item.to ? format(new Date(item.to), 'yyyy') : t('current_time')
        }`}
      />
    )
  }

  const onEditNavigate = () => {
    navigate(EScreens.ProfileAddInfoWork, { isEdit: true })
  }

  return (
    <>
      {isVisible && (
        <FlexWrapper flexDirection={'column'} mBottom={'16px'}>
          <FlexWrapper mBottom={'16px'} justify={'space-between'}>
            <LSemibold>{t('work_experience')}</LSemibold>

            {isEdit && (
              <AddChangeButtons onEditPress={onEditNavigate} hideAdd />
            )}
          </FlexWrapper>

          {work.map(renterEducation)}
        </FlexWrapper>
      )}
    </>
  )
}
