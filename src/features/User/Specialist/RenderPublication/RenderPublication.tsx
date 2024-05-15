import React, { useCallback, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { EScreens } from '@/app/navigation'
import { useGetPublication } from '@/features/Publication'
import { useNavigation } from '@/features/hooks'
import { publicationActions, PublicationEntities } from '@/entities/Publication'
import { EPublicationType, TPublication } from '@/entities/Publication/models'
import { UserEntities } from '@/entities/User'
import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import { PaginationController } from '@/shared/ui/PaginationController'
import { Button } from '@/shared/ui/button'
import { TUserRenderPublicationProps } from './types'
import { useDispatch } from 'react-redux'
import { AddChangeButtons } from '../AdditionalInformation/ui/AddChangeButtons'

export const RenderPublication = ({
  title = '',
  isEdit = false,
  type = 'publication',
  emptyText = '',
  emptyIcon = 'PublicationEmpty',
  onAddPress = () => {},
  onEditPress = () => {},
  ownerId = '',
  hideIfEmpty = false,
  onNavigatePress,
}: TUserRenderPublicationProps) => {
  const { navigate } = useNavigation()
  const isFocused = useIsFocused()
  const { totalCount, page, setPage, publication, getActions } =
    useGetPublication({ type, ownerId })
  const dispatch = useDispatch()

  useEffect(() => {
    getActions(1)
  }, [isFocused])

  const isEmpty = !publication.length

  const onPublicationPress = (data: TPublication) => {
    getActions(1)
    dispatch(publicationActions.setState({ singlePublication: data }))

    if (onNavigatePress) {
      onNavigatePress()

      return
    }

    navigate(EScreens.ListPublicationStack, {
      screen: EScreens.PublicationScreen,
      params: { type, id: data._id },
    })
  }

  const renderOffer = useCallback(
    (props: TPublication) => {
      const localProps = {
        key: props._id,
        mBottom: '12px',
      }
      if (type === 'publication') {
        return (
          <PublicationEntities.Publication
            imageType="publication"
            onPress={() => onPublicationPress(props)}
            {...props}
            {...localProps}
          />
        )
      }

      if (type === 'skillbox') {
        return (
          <UserEntities.Offer
            onPress={() => onPublicationPress(props)}
            {...props}
            {...localProps}
            isSkillBox
          />
        )
      }

      if (type === 'special-offer') {
        return (
          <UserEntities.Offer
            onPress={() => onPublicationPress(props)}
            {...props}
            {...localProps}
          />
        )
      }

      return <></>
    },
    [type],
  )

  const renderComponent = {
    [EPublicationType.publication]: renderOffer,
    [EPublicationType.skillbox]: renderOffer,
    [EPublicationType.specialOffer]: renderOffer,
  }

  const currentComponent = renderComponent[type]

  const renderItem = (item: TPublication) => (
    <React.Fragment key={item._id}>{currentComponent(item)}</React.Fragment>
  )

  return (
    <>
      {!hideIfEmpty && !isEmpty}
      <FlexWrapper mBottom={'20px'} mTop={'20px'} flexDirection={'column'}>
        <FlexWrapper justify={'space-between'}>
          {title && <LSemibold>{title}</LSemibold>}

          {isEdit && <AddChangeButtons onAddPress={onAddPress} hideEdit />}
        </FlexWrapper>

        <FlexWrapper
          mTop={'20px'}
          justify={'space-between'}
          align={'flex-start'}
          wrap={'wrap'}>
          {!isEmpty && <>{publication.map(renderItem)}</>}

          {isEmpty && <UserEntities.Empty icon={emptyIcon} title={emptyText} />}
        </FlexWrapper>
        {!!totalCount && (
          <PaginationController
            mTop={'20px'}
            onPressNext={() => setPage(page + 1)}
            onPressPrevious={() => setPage(page - 1)}
            page={page}
            totalPages={
              +(totalCount / 4).toFixed() < 1 ? 1 : +(totalCount / 4).toFixed()
            }
          />
        )}
      </FlexWrapper>
    </>
  )
}
