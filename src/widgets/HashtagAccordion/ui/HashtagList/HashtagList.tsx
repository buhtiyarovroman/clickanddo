import { THashTag } from '@/entities/User/models'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { Loader } from '@/shared/ui/loader'
import { EColors } from '@/shared/ui/Styled'
import { Hr } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { LayoutChangeEvent } from 'react-native/types'
import { THashtagAccordionListProps } from '../../types'
import * as S from './styled'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'

export const HashtagList = ({
  searchableHashtag = [],
  setSearchableHashtag = () => {},

  selectedHashtag = [],
  setSelectedHashtag = () => {},

  loading = false,
  onAddHashTag = () => {},

  setSearch = () => {},
  setDataHeight = () => {},
  setResultHeight = () => {},
}: THashtagAccordionListProps) => {
  const onClearInput = () => {
    setSearch('')
  }

  const onPressHashtag = (searchHashtag: THashTag) => {
    setSelectedHashtag([...selectedHashtag, searchHashtag])
  }

  const onPressSelectedHashtag = (hashtag: THashTag) => {
    setSelectedHashtag(selectedHashtag.filter(item => item._id !== hashtag._id))
  }

  const handleDataHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    // console.log('handleDataHeight', height)
    setDataHeight(height + 8)
  }

  const handleResultHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    // console.log('handleResultHeight', height)
    setResultHeight(height + 8)
  }

  const renderCurrentHashtag = (item: THashTag) => {
    return <HashtagItem isActive {...item} onPress={onPressSelectedHashtag} />
  }

  const renderSearchHashtag = (item: THashTag) => {
    return <HashtagItem {...item} onPress={onPressHashtag} />
  }

  return (
    <>
      <S.Tags onLayout={handleDataHeight}>
        {selectedHashtag.map(renderCurrentHashtag)}

        {selectedHashtag.length !== 0 && (
          <>
            <Hr color={EColors.grey_300} mTop="5px" mBottom="5px" />
          </>
        )}
      </S.Tags>

      {loading && <Loader.Standard size={30} />}

      {/* Searchable hashtag */}
      <S.SearchingHashtagScroll onLayout={handleResultHeight}>
        {selectedHashtag.length < 3 &&
          !!searchableHashtag.length &&
          searchableHashtag.map(renderSearchHashtag)}
        {selectedHashtag.length < 3 && !searchableHashtag.length && (
          <>
            <EmptyHashtag onPress={onAddHashTag} />
          </>
        )}
      </S.SearchingHashtagScroll>
    </>
  )
}
