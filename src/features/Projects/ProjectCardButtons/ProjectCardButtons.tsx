import React from 'react'

import { TProjectCardButtonsProps } from './types'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, LRegular, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

import { ReviewButtons } from './components'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const ProjectCardButtons = ({
  _id,
  specialist,
  status = 'searching',
  onRefresh = () => {},
  name = '',
  ...props
}: TProjectCardButtonsProps) => {
  const { t } = useTranslation()

  const { user } = useTypedSelector(getUserSelector)
  const { navigate } = useNavigation()

  const isMarkDoneStatus = status === 'mark-done'
  const isProgressStatus = status === 'in-progress'
  const isPendingSpecialistStatus = status === 'pending-specialist'

  const isDoneStatus = status === 'done'
  const isHoldStatus = status === 'hold'
  const isCustomer = user?.role === 'customer'

  const onGoFeedback = () => {
    if (!_id) {
      console.error('no have project id')
      return
    }

    navigate(EScreens.ProjectResponses, {
      id: _id,
      specialist: !!specialist,
      name: name,
    })
  }

  return (
    <>
      <FlexWrapper>
        {isCustomer && !isHoldStatus && !specialist && (
          <Button.Standard
            mTop={'16px'}
            color={EColors.black}
            onPress={onGoFeedback}>
            <LRegular color={EColors.white} mRight={'10px'}>
              {t('go_to_response')}
            </LRegular>

            <Icon name={'ArrowRight'} size={20} />
          </Button.Standard>
        )}

        {/* Buttons for open bottom sheets reviews */}
        {!isHoldStatus && (
          <ReviewButtons
            {...{
              isDoneStatus,
              _id,
              isCustomer,
              specialist,
              onRefresh,
              isProgressStatus,
              isMarkDoneStatus,
              isPendingSpecialistStatus,
            }}
            {...props}
          />
        )}

        {/* If specialist set status = mark-done */}
        {!isCustomer && !!specialist && isMarkDoneStatus && (
          <MRegular mTop={'16px'} color={EColors.grey_500} align={'center'}>
            {t('waiting_customer')}
          </MRegular>
        )}
      </FlexWrapper>
    </>
  )
}
