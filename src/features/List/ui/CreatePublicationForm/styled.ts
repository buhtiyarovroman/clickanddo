import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const CLike = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HashtagWrapper = styled(View)`
  width: 100%;
`

export const TouchableCheckbox = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  ${FLEX({ justify: 'flex-start' })}
`

export const AddImage = styled(View).attrs({
  activeOpacity: 0.8,
})<{ isFirst: boolean; hasError?: boolean }>`
  width: ${wp(37)}px;
  aspect-ratio: 1;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${EColors.grey_200};
  border-width: 1px;
  border-color: ${({ hasError }) =>
    hasError ? EColors.error : EColors.grey_200};
  ${FLEX({ direction: 'column' })}
`
