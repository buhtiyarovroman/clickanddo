import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: 16,
  },
  list_column: {
    justifyContent: 'space-between',
    width: '100%',
  },
  list_content: {
    paddingBottom: TAB_HEIGHT * 3,
  },
  separator: {
    height: wp(4),
  },
})
