import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useEffect } from 'react'
import { UserWidget } from '@/widgets/User'
import { useTypedSelector } from '@/app/store'
import { getUserSelector, userActions } from '@/entities/User'
import { LoaderContext } from '@/app/contexts/Loader'
import { useIsFocused } from '@react-navigation/native'
import { styles } from './styled'
import { useDispatch } from 'react-redux'

export const Main = () => {
  const { user, loading } = useTypedSelector(getUserSelector)
  const isFocused = useIsFocused()
  const { setLoading } = useContext(LoaderContext)
  const isCustomer = user?.role === 'customer'
  const dispatch = useDispatch()

  useEffect(() => {
    // setLoading(false)
    //I need to trigger useEffect by only this params
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isFocused])

  useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getCurrentUserRequest({ disableLoader: true }))
      dispatch(userActions.getAllUserRequest({ disableLoader: true }))
    }
    //I need to trigger useEffect by only this params
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

  return (
    <>
      <Background.SafeArea>
        <Header.Profile showMyName />
        {isCustomer ? (
          <UserWidget.Customer user={user} isEdit />
        ) : (
          <Background.Scroll
            pHorizontal={20}
            contentContainerStyle={styles.main}>
            <UserWidget.Specialist user={user} isEdit />
          </Background.Scroll>
        )}
      </Background.SafeArea>
    </>
  )
}
