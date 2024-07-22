import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  H2SemiBold,
  H3SemiBold,
  LMedium,
} from '@/shared/ui/Styled/Styled'
import React from 'react'
import { AddContainer, InfoContainer, styles } from './styled'
import { TUserSpecialistInfoProps } from './types'
import { Avatar } from './ui'
import { Icon } from '@/shared/ui/Icon'
import { getCurrentCount } from './helper'
import { Button } from '@/shared/ui/button'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { useDispatch } from 'react-redux'
import { projectsActions } from '@/entities/Projects/store'
import { useCreateChat } from '@/features/Chat'
import { useCheckFavorites } from '@/features/Favorites'

export const UserInfo = ({
  login = '',
  photo = '',
  subscribers = 0,
  rating = 0,
  name = '',
  secondName = '',
  isEdit = false,
  totalProjects = 0,
  activeProjects = 0,
  role,
  _id,
  hashtag = [],
}: TUserSpecialistInfoProps) => {
  const isCustomer = role === 'customer' || false
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { onCreateChat, loader } = useCreateChat({})

  const { inFavorites, onAddFavorite, onDeleteFavorite } = useCheckFavorites({
    id: _id || '',
  })

  const completedProjects =
    totalProjects === 0 ? 0 : totalProjects - activeProjects

  const onGoCreate = () => {
    if (!_id) {
      console.error('no have specialist id')
      return
    }

    dispatch(projectsActions.clearProjectCreate())

    dispatch(
      projectsActions.setProjectFields({
        specialist: _id,
        projectResponses: [
          {
            specialist: _id,
            name,
            secondName,
            photo,
          },
        ],
        hashtag: hashtag,
      }),
    )

    navigate(EScreens.JobCreateProjectStack, {
      screen: EScreens.ProjectCreatePersonal,
      params: { stack: EScreens.JobProfile },
    })
  }

  const _onFavoritePress = () => {
    if (!_id) return

    if (inFavorites) {
      onDeleteFavorite(_id)
      return
    }

    onAddFavorite({
      favorite: _id,
      hashtag: hashtag[0]._id || '',
      name: `${name || ''} ${secondName || ''}`,
      type: 'specialist',
    })
  }

  const onPressEnd = () => {
    console.log('presed')
  }

  return (
    <>
      <FlexWrapper justify={'flex-start'} mBottom={'20px'}>
        <Avatar {...{ photo, isEdit, isCustomer }} />
        <FlexWrapper
          mLeft={'16px'}
          align={'flex-start'}
          justify={'flex-start'}
          width={'70%'}
          flexDirection={'column'}>
          <H2SemiBold numberOfLines={2} style={styles.text}>
            {name} {secondName}
          </H2SemiBold>
          <LMedium mTop={'5px'} color={EColors.primary}>
            @{login}
          </LMedium>

          <FlexWrapper mTop={'10px'} width={'auto'} justify={'space-around'}>
            <InfoContainer>
              <Icon size={24} name={'UserFill'} />

              <H3SemiBold color={EColors.grey_500}>
                {getCurrentCount(subscribers)}
              </H3SemiBold>
            </InfoContainer>
            <InfoContainer>
              <Icon size={20} name={'ListOrder'} fill={EColors.grey_500} />

              <H3SemiBold color={EColors.grey_500}>
                {completedProjects}
              </H3SemiBold>
            </InfoContainer>
            <InfoContainer>
              <Icon size={24} name={'Star'} fill={EColors.grey_500} />

              <H3SemiBold color={EColors.grey_500}>
                {(rating || 0).toFixed(2)}
              </H3SemiBold>
            </InfoContainer>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>

      {!isEdit && (
        <>
          <FlexWrapper justify={'space-between'} mBottom={'16px'}>
            <Button.Standard
              disabled={loader}
              width={!isCustomer ? '60%' : '80%'}
              onPress={() => onCreateChat(_id)}
              text={t('message')}
            />
            {!isCustomer && (
              <AddContainer onPress={_onFavoritePress}>
                <Icon
                  name={'HeartFill'}
                  size={24}
                  fill={inFavorites ? EColors.error : EColors.grey_600}
                />
              </AddContainer>
            )}

            <AddContainer>
              <Icon name={'ShareLine'} size={20} fill={EColors.grey_600} />
            </AddContainer>
          </FlexWrapper>

          {!isCustomer && (
            <Button.Standard
              color={EColors.transparent}
              textColor={EColors.grey_700}
              style={{ borderColor: EColors.grey_400, borderWidth: 1 }}
              onPress={onGoCreate}
              text={t('personal_invite')}
            />
          )}
        </>
      )}
    </>
  )
}
