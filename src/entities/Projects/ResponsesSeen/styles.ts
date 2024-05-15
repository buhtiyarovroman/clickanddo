import { Image } from '@/shared/ui/image'
import { EColors } from '@/shared/ui/Styled'
import { View } from 'react-native'
import styled from 'styled-components'

export const StyledImage = styled(Image.Standard)<{ index: number }>`
  height: 30px;
  width: 30px;
  border-color: ${EColors.grey_200};
  border-width: 2px;
  border-radius: 50px;
  right: ${({ index }) => (index !== 0 ? 12 * index : 0)}px;
`

export const IconWrapper = styled(View)`
  margin-right: 8px;
`

export const LastItem = styled(View)<{ index: number }>`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: ${EColors.grey_300};
  border-color: ${EColors.grey_200};
  border-width: 2px;
  border-radius: 50px;
  right: ${({ index }) => 12 * index}px;
`
