import React, { useCallback } from 'react'
import { TMessageChatImagesProps } from './types'
import { ChatImage } from './styled'
import { v4 as uuidv4 } from 'uuid'
import {
  ListRenderItem,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ChatFeatures } from '@/features/Chat'

export const Images = ({
  files = [],
  onPress = () => {},
  isMy = false,
}: TMessageChatImagesProps) => {
  const filesMass = files.filter(item => item.includes('.pdf'))
  const ImagesMass = files.filter(item => !item.includes('.pdf'))

  const numColumns = ImagesMass.length === 1 ? 1 : 3
  const imageSize = Dimensions.get('window').width / numColumns - 70

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item, index }) => {
      const type = item.includes('/') ? undefined : 'chat'
      return (
        <TouchableWithoutFeedback onPress={() => onPress(index)}>
          <ChatImage
            mLeft={'5px'}
            mBottom={'5px'}
            type={type}
            width={imageSize + 'px'}
            height={imageSize + 'px'}
            source={item}
          />
        </TouchableWithoutFeedback>
      )
    },
    [imageSize, onPress],
  )

  const renderFiles: ListRenderItem<string> = useCallback(
    ({ item }) => {
      return <ChatFeatures.FileComponent isMy={isMy} path={item} />
    },
    [isMy],
  )

  const flatListKey = `ChatListImages-${numColumns}`
  const flatListKeyFiles = `ChatListFiles-${numColumns}`

  return (
    <View>
      <FlatList
        key={flatListKeyFiles}
        data={filesMass}
        renderItem={renderFiles}
        keyExtractor={() => uuidv4()}
      />
      <FlatList
        key={flatListKey}
        data={ImagesMass}
        renderItem={renderItem}
        keyExtractor={() => uuidv4()}
        numColumns={numColumns}
      />
    </View>
  )
}
