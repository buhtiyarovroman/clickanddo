import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React from 'react'
import { ProfileWrapper } from '@/widgets/User/ProfileWrapper'
import { useGetUserById } from '@/features/User/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { EScreens, TJobStack } from '@/app/navigation'

export const OtherProfile = () => {
  const { id } = useRoute<RouteProp<TJobStack, EScreens.JobProfile>>().params

  const { user } = useGetUserById({ id })

  const userName = `${user?.name || ''} ${
    user?.secondName ? user?.secondName : ''
  }`

  return (
    <>
      <Background.SafeArea>
        <Header.Profile disableDots nameUser={userName} />
        {user && <ProfileWrapper user={user} isEdit={false} />}
      </Background.SafeArea>
    </>
  )
}
