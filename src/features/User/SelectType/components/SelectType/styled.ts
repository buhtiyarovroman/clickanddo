import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { FLEX } from '@/shared/ui/utils'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components'

export const ScrollContainer = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 12px 10px;

  width: 100%;
`

export const Container = styled(FlexWrapper).attrs({
  flexDirection: 'column',
})`
  padding: 12px 20px;
`

export const ItemContainer = styled(TouchableOpacity)`
  width: 100%;
  padding: 13px 0px;

  ${FLEX({ justify: 'flex-start' })}
`
export const styles = StyleSheet.create({
  datePicker: {
    width: Dimensions.get('screen').width,
    marginTop: 20,
  },
})
