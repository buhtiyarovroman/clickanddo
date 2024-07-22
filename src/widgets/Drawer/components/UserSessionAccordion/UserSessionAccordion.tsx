import React from 'react'
import { View } from 'react-native'

import { AccordionFiled } from '@/shared/ui/input/AccordionFiled'
import { UserSession } from '@/entities/User/UserSession'
import { useTypedSelector } from '@/app/store'
import { getUserSelector, userActions } from '@/entities/User'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { useDispatch } from 'react-redux'
import { EUserRole, TUser } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'
import { AddAccount } from '@/features/User/AddAccount'

export const UserSessionAccordion = () => {
  const dispatch = useDispatch()
  const { user, userSessions } = useTypedSelector(getUserSelector)

  const isShowAddButton =
    userSessions.map(el => el.role).includes(EUserRole.customer) &&
    userSessions.length < 2

  const renderAccordionHeader = (isOpen: boolean) => (
    <UserSession {...user} isOpen={isOpen} showCountMessage />
  )

  const onPress = async (newUser: TUser) => {
    dispatch(userActions.setUser(newUser))

    UserService.setUserId(newUser._id)
  }

  const renderAccordionContent = () => (
    <FlexWrapper flexDirection={'column'} mTop={'10px'}>
      {userSessions
        .filter(item => item._id !== user?._id)
        .map((item, index) => (
          <UserSession
            showCountMessage
            key={index}
            onPress={() => onPress(item)}
            isSelected
            mBottom={'10px'}
            isActive={false}
            {...item}
          />
        ))}

      {isShowAddButton && <AddAccount />}
    </FlexWrapper>
  )

  return (
    <View>
      <AccordionFiled
        renderHeader={renderAccordionHeader}
        renderContent={renderAccordionContent}
      />
    </View>
  )
}
