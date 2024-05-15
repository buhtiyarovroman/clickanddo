import { FlatList } from 'react-native'

export type TInputProps = {
  flatListRef: React.MutableRefObject<FlatList | null>
}

export type TInputForm = { message: string }

export type TFilesChat = {
  id: string
  path: string
  name?: string
}
