import { ViewStyle } from 'react-native'

import { EColors } from '../../Styled'
import { autocompleteStyles } from './styled'

const backgroundColor = EColors.grey_200
const textColor = EColors.black

export const getStyles = ({
  listViewStyles,
}: {
  listViewStyles?: ViewStyle
}) => {
  return {
    ...autocompleteStyles,
    textInput: {
      ...autocompleteStyles.textInput,
      color: textColor,
      backgroundColor: backgroundColor,
    },
    row: {
      ...autocompleteStyles.row,
      backgroundColor,
      color: textColor,
    },
    listView: {
      ...autocompleteStyles.listView,
      ...listViewStyles,
    },
    separator: {
      ...autocompleteStyles.separator,
    },
    description: {
      color: textColor,
    },
  }
}
