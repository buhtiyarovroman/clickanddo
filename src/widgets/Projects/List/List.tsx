import React, { useMemo } from 'react'
import { Lists } from './ui'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { useTypedSelector } from '@/app/store'
import { EUserRole } from '@/entities/User/models'
import { getUserSelector } from '@/entities/User'

export const List = () => {
  const { user } = useTypedSelector(getUserSelector)

  const isCustomer = (user?.role as EUserRole) || EUserRole.specialist

  const components = useMemo(
    () => ({
      [EUserRole.customer]: Lists.CustomerList,
      [EUserRole.specialist]: Lists.SpecialistList,
    }),
    [],
  )

  const CurrentList = useMemo(
    () => components[isCustomer],
    [components, isCustomer],
  )

  return (
    <>
      <FlexWrapper style={{}} height={'100%'} align={'flex-start'}>
        <CurrentList />
      </FlexWrapper>
    </>
  )
}
