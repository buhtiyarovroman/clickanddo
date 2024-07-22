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
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const HashtagList = ({
  searchableHashtag = [],

  selectedHashtag = [],
  setSelectedHashtag = () => {},

  loading = false,
  onAddHashTag = () => {},

  setDataHeight = () => {},
  setResultHeight = () => {},
}: THashtagAccordionListProps) => {
  const { user } = useTypedSelector(getUserSelector)
  const hashtagIDS = user?.hashtag.map(item => item._id) || []
  const data = searchableHashtag.filter(item => !hashtagIDS.includes(item._id))
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

  const renderCurrentHashtag = (item: THashTag) => (
    <HashtagItem
      key={item._id}
      isActive
      {...item}
      onPress={onPressSelectedHashtag}
    />
  )

  const renderSearchHashtag = (item: THashTag) => (
    <HashtagItem key={item._id} {...item} onPress={onPressHashtag} />
  )

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
          !!data.length &&
          data.map(renderSearchHashtag)}
        {selectedHashtag.length < 3 && !data.length && (
          <>
            <EmptyHashtag onPress={onAddHashTag} />
          </>
        )}
      </S.SearchingHashtagScroll>
    </>
  )
}
