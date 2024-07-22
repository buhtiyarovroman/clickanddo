import React, { useEffect, useRef, useState } from 'react'

import { FlatList } from 'react-native'
import { Loader } from '@/shared/ui/loader'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useGetPublicationWithPagination } from '@/features/Publication'
import { BottomSheet } from '@/widgets/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { Input } from '@/shared/ui/input'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'
import * as S from './styled'
import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { HashtagAccordion } from '@/widgets/HashtagAccordion'
import { THashTag } from '@/entities/User/models'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { ListWidgets } from '../../index'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import { EColors } from '@/shared/ui/Styled'

type TCustomerListProps = { onlyList?: boolean }

export const CustomerList = ({ onlyList = false }: TCustomerListProps) => {
  const { navigate } = useNavigation()

  const { bottom } = useSafeAreaInsets()

  const isFocused = useIsFocused()

  const [height, setHeight] = useState(0)
  const [selectedHashtag, setSelectedHashtag] = useState<THashTag[]>([])

  const { foundHashTags, search, setSearch, onAddHashTag, loading } =
    useFindHashtags()

  const ids = selectedHashtag.map(item => item._id)

  const searchableHashtag = foundHashTags.filter(el => !ids.includes(el._id))

  const { publication, getMore, loadMoreLoading, filterData, getFirstPage } =
    useGetPublicationWithPagination({
      limit: 10,
      hashtag: ids,
    })

  useEffect(() => {
    getFirstPage()
  }, [selectedHashtag, isFocused])

  const ref = useRef<TBottomSheetBaseRef | null>(null)
  const { t } = useTranslation()

  const renderFooter = () => {
    if (!loadMoreLoading) return null

    return <Loader.Standard mBottom="20px" mTop={'20px'} />
  }

  const onOpen = () => {
    ref.current?.open()
  }

  const goMap = () => {
    navigate(EScreens.ListMap)
  }

  return (
    <>
      {!onlyList && (
        <S.InputContainer>
          <Input.Search
            width={'60%'}
            value={search}
            onChange={setSearch}
            label={t('tag_search')}
            placeholder={t('search_by_category')}
          />

          <S.FilterContainer onPress={goMap}>
            <Icon
              height={20}
              width={20}
              name={'RoadMap'}
              size={24}
              fill={EColors.white}
            />
          </S.FilterContainer>

          <S.FilterContainer onPress={onOpen}>
            <Icon height={20} width={20} name={'Filter'} size={24} />
          </S.FilterContainer>
        </S.InputContainer>
      )}

      {!onlyList && (
        <S.HashTagsContainer>
          <HashtagAccordion
            loading={loading}
            onAddHashTag={onAddHashTag}
            searchableHashtag={searchableHashtag}
            selectedHashtag={selectedHashtag}
            setSelectedHashtag={setSelectedHashtag}
            setSearch={setSearch}
            setSearchableHashtag={() => {}}
            searchLength={search.length}
            getDataHeight={setHeight}
          />
        </S.HashTagsContainer>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        onEndReached={() => getMore()}
        data={[1]}
        contentContainerStyle={{ paddingBottom: TAB_HEIGHT * 3 + bottom }}
        renderItem={() => <ListWidgets.ListTile publications={publication} />}
        ListFooterComponent={renderFooter}
      />

      {!onlyList && <BottomSheet.List ref={ref} filterData={filterData} />}
    </>
  )
}
