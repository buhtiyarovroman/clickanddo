import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { FLEX } from '@/shared/ui/utils'

export const FileContainer = styled(FlexWrapper).attrs({
  justify: 'space-between',
})<{ color: EColors }>`
  background-color: ${({ color }) => color};
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 12px;
`

export const FileImageContainer = styled(FlexWrapper).attrs({
  justify: 'space-between',
})`
  width: 50px;
  height: 50px;
  ${FLEX({})}
`

export const DownloadContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  margin-left: 10px;
  padding: 5px;
`
