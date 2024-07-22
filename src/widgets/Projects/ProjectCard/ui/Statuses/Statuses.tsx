import React from 'react'
import { useTranslation } from 'react-i18next'

import { TProjectCardStatusesProps } from './types'

// import { Icon } from '@/shared/ui/Icon'
import {
  FlexWrapper,
  MRegular,
  SMedium,
  SRegular,
} from '@/shared/ui/Styled/Styled'
// import { iconMapping } from '@/features/Publication/iconConfig'
import { format } from 'date-fns'
import { EColors } from '@/shared/ui/Styled'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { Image } from '@/shared/ui/image'
import { styles } from './styled'

export const Statuses = ({
  originType,
  relevantUntil,
  status,
  specialist,
  startDate,
}: TProjectCardStatusesProps) => {
  const { t } = useTranslation()

  const { user: myUser } = useTypedSelector(getUserSelector)

  const isActive = status === 'in-progress'
  const isCustomer = myUser?.role === 'customer'

  return (
    <>
      {!isActive && (
        <>
          {!!originType && (
            <FlexWrapper mTop={'10px'} justify={'flex-start'}>
              {/* <Icon name={iconMapping[originType]} /> */}
              {!!startDate && (
                <MRegular>
                  {format(new Date(startDate), 'dd.MM.yyyy hh:mm')}
                </MRegular>
              )}
            </FlexWrapper>
          )}

          {relevantUntil && (
            <FlexWrapper mTop={'10px'} justify={'space-between'}>
              <SMedium style={styles.main}>
                {t('relevance_date_project')}
              </SMedium>

              <SRegular color={EColors.grey_500}>
                {format(new Date(relevantUntil), 'dd.MM.yyyy')}
              </SRegular>
            </FlexWrapper>
          )}
        </>
      )}

      {isActive && isCustomer && !!specialist && (
        <FlexWrapper justify={'flex-start'}>
          <Image.Standard
            style={styles.image}
            type={'user'}
            source={specialist.photo}
          />

          <MRegular mLeft={'10px'}>
            {specialist.name} {specialist.secondName}
          </MRegular>
        </FlexWrapper>
      )}
    </>
  )
}
