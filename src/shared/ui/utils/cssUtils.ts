import { css } from 'styled-components'
import { TFlex, TFont, TMargin } from './types'
import { EFonts } from './font'
import { EColors } from '../Styled/colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'
const { height } = Dimensions.get('screen')

export const FONT = ({
  color = EColors.black,
  size = '16px',
  weight = '400',
  //Change font what you use
  font = EFonts.gilroy,
  align = 'left',
  style = 'normal',
}: TFont) => {
  return css`
    font-family: '${font}';
    color: ${color};
    font-size: ${RFValue(+size.replace('px', ''), height)}px;
    font-weight: ${weight};
    text-align: ${align};
    font-style: ${style};
  `
}

export const MARGIN = ({
  mTop = '0px',
  mBottom = '0px',
  mRight = '0px',
  mLeft = '0px',
}: TMargin) => {
  return css`
    margin-top: ${mTop};
    margin-bottom: ${mBottom};
    margin-left: ${mLeft};
    margin-right: ${mRight};
  `
}

export const FLEX = ({
  direction = 'row',
  align = 'center',
  justify = 'center',
  wrap = 'nowrap',
}: TFlex) => {
  return `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
    flex-wrap: ${wrap};
  `
}
