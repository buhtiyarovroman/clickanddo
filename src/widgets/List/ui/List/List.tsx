import { EScreens } from '@/app/navigation'
import { publicationActions, PublicationEntities } from '@/entities/Publication'
import { EPublicationType, TPublication } from '@/entities/Publication/models'
import { UserEntities } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { useGetPublicationSkip } from '@/features/Publication'
import { Loader } from '@/shared/ui/loader'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React, { useCallback, useEffect } from 'react'
import { FlatList, ListRenderItem, RefreshControl } from 'react-native'
import { useDispatch } from 'react-redux'
import { TListSpecialistProps } from './types'
import { ButtonContainer, Container } from './styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

export const List = ({ type }: TListSpecialistProps) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { bottom } = useSafeAreaInsets()
  const isFocused = useIsFocused()
  const {
    publication,
    canGetMoreItems,
    loadMoreLoading,
    refreshLoading,
    getFirstPage,
    getMore,
  } = useGetPublicationSkip({
    type,
    limit: 10,
  })

  const onRefresh = () => {
    getFirstPage()
  }

  useEffect(() => {
    isFocused && onRefresh()
  }, [isFocused])

  const onPublicationPress = (data: TPublication) => {
    dispatch(publicationActions.setState({ singlePublication: data }))

    navigate(EScreens.ListPublicationStack, {
      screen: EScreens.PublicationScreen,
      params: { type, id: data._id },
    })
  }

  const renderItem: ListRenderItem<TPublication> = useCallback(
    ({ item }) => {
      const localProps = {
        key: item._id,
        mBottom: '12px',
      }
      if (type === 'publication') {
        return (
          <PublicationEntities.Publication
            imageType="publication"
            onPress={() => onPublicationPress(item)}
            {...item}
            {...localProps}
          />
        )
      }

      if (type === 'skillbox') {
        return (
          <UserEntities.Offer
            onPress={() => onPublicationPress(item)}
            isSkillBox
            {...item}
            {...localProps}
          />
        )
      }

      if (type === 'special-offer') {
        return (
          <UserEntities.Offer
            onPress={() => onPublicationPress(item)}
            {...item}
            {...localProps}
          />
        )
      }

      return <></>
    },
    [type],
  )

  const onGetMore = () => {
    if (canGetMoreItems) getMore()
  }

  const renderFooter = () => {
    if (canGetMoreItems && loadMoreLoading) {
      return (
        <FlexWrapper mTop={'16px'}>
          <Loader.Standard />
        </FlexWrapper>
      )
    }

    return <></>
  }

  const onGoCreate = () => {
    if (type === EPublicationType.publication) {
      navigate(EScreens.ListCreatePublication)
    }
    if (type === EPublicationType.skillbox) {
      navigate(EScreens.ListCreateSkillBox)
    }
    if (type === EPublicationType.specialOffer) {
      navigate(EScreens.ListSpecialOffer)
    }
  }

  return (
    <Container style={{}}>
      <FlatList
        data={publication}
        renderItem={renderItem}
        onEndReached={onGetMore}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={onRefresh}
            tintColor={EColors.primary}
          />
        }
        key={2}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_HEIGHT * 3 + bottom }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <ButtonContainer bottomInst={bottom}>
        <Button.Standard
          onPress={onGoCreate}
          width={'30%'}
          text={t('create')}
        />
      </ButtonContainer>
    </Container>
  )
}
