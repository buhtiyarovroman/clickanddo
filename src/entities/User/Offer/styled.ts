import { FLEX, MARGIN } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { Image } from '@/shared/ui/image'
import { TStyledContainer } from './types'
import { EColors } from '@/shared/ui/Styled'
import { LRegular, MRegular } from '@/shared/ui/Styled/Styled'

export const SectionContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledContainer>`
  width: ${({ width }) => width};
  ${FLEX({ direction: 'column' })}
  ${props => MARGIN(props)};

  background-color: ${EColors.white};
  border-radius: 7px;
`

export const DescContainer = styled(View)`
  width: 100%;
  padding: 8px 2px;
`

export const StyledImage = styled(Image.Standard).attrs({
  type: 'publication',
})`
  width: 100%;
  height: 120px;

  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`

export const DiscountWrapper = styled(View)`
  width: auto;
  padding: 1px 4px;
  background-color: ${EColors.error_L2};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 4px;
`

export const StyledLRegular = styled(LRegular).attrs({
  color: EColors.grey_800,
})`
  line-height: 18px;
`

export const StyledMRegular = styled(MRegular)`
  line-height: 17px;
`

export const StyledMRegularLineThrough = styled(StyledMRegular).attrs({
  color: EColors.grey_500,
})`
  text-decoration-line: line-through;
  margin-left: 3px;
`

export const InvalidContainer = styled(View)`
  width: 100%;
  background-color: ${EColors.grey_200};
  border-radius: 8px;
  padding: 7px 0px;

  ${FLEX({})}
`
