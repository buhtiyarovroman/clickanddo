import React, { useContext } from 'react'
import { TouchContainer } from './styled'
import { Icon } from '@/shared/ui/Icon'
import { LRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserEntities, getUserSelector, userActions } from '@/entities/User'
import { useTypedSelector } from '@/app/store'
import { EUserRole } from '@/entities/User/models'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export const AddAccount = () => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)
  const { user, userSessions } = useTypedSelector(getUserSelector)
  const { postUser } = UserEntities.UserService
  const dispatch = useDispatch()

  const onAddAccount = async () => {
    if (!user) {
      console.error('onAddAccount => No user ')

      return
    }

    try {
      setLoading(true)

      const response = await postUser({
        name: user.name,
        secondName: user.secondName,
        phone: user.phone,
        email: user.email,
        country: user.country,
        login: user.login,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: EUserRole.specialist,
        location: {
          type: 'Point',
          coordinates: user.location.coordinates,
        },
      })

      dispatch(userActions.setUserSessions([...userSessions, response.data]))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log('onAddAccount err =>', err.response?.data)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <TouchContainer onPress={onAddAccount}>
      <Icon size={16} stroke={EColors.primary} name={'Plus'} />

      <LRegular color={EColors.primary} mLeft={'8px'}>
        {t('add_account')}
      </LRegular>
    </TouchContainer>
  )
}
