import React from 'react'
import { TUsetWidgetsProfileWrapperProps } from './types'
import { EUserRole } from '@/entities/User/models'
import { UserWidget } from '..'
import { Background } from '@/shared/ui/background'
import { styles } from './styled'

export const ProfileWrapper = ({
  user,
  isEdit = false,
}: TUsetWidgetsProfileWrapperProps) => {
  const isCustomer = user?.role === EUserRole.customer

  return (
    <>
      {isCustomer && <UserWidget.Customer {...{ user, isEdit }} />}

      {!isCustomer && (
        <>
          {!isEdit && <UserWidget.SpecialistGuest {...{ user, isEdit }} />}

          {!!isEdit && (
            <Background.Scroll
              pHorizontal={20}
              contentContainerStyle={styles.main}>
              <UserWidget.Specialist {...{ user, isEdit }} />
            </Background.Scroll>
          )}
        </>
      )}
    </>
  )
}
