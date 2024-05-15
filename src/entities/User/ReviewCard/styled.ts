import { FLEX, MARGIN } from '@/shared/ui/utils'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import { TStyledContainer } from './types'
import { EColors } from '@/shared/ui/Styled'
import { SRegular } from '@/shared/ui/Styled/Styled'

export const ReviewContainer = styled(View).attrs({
  activeOpacity: 0.8,
})<TStyledContainer>`
  width: ${({ width }) => width};
  ${FLEX({ direction: 'column', align: 'flex-start' })}
  ${props => MARGIN(props)};

  background-color: ${EColors.white};
  border-radius: 12px;
  padding: 16px 12px;
`

export const BlueDot = styled(View)`
  width: 3px;
  height: 3px;
  border-radius: 100px;
  background-color: ${EColors.info};
  margin: 0px 10px;
`

export const UserText = styled(SRegular).attrs({
  numberOfLines: 1,
  color: EColors.grey_500,
})`
  width: 30%;
`

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#00000059',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
