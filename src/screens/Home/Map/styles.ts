import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'

const baseSearchItem = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 24,
  margin: 5,
}

export const styles = StyleSheet.create({
  main: {
    backgroundColor: 'red',
  },
  list: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  searchItem: {
    ...baseSearchItem,
    backgroundColor: EColors.grey_200,
  },
  searchItemSelected: {
    ...baseSearchItem,
    backgroundColor: EColors.primary,
  },
  projectsList: {
    marginTop: 15,
  },
  separator: {
    height: 10,
  },
})
