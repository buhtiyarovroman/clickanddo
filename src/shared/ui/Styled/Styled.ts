import { Platform, Text, TouchableOpacity, View } from 'react-native'
import styled, { css } from 'styled-components'

import { MARGIN, FONT, EFonts } from '../utils'

import { EColors } from './colors'
import { TFlexWrapper, THr, TStyledTextProps, TDivider } from './types'

const weight = Platform.OS === 'android' ? '800' : '600'

export const StyledText = styled(Text)<TStyledTextProps>`
  ${({ font }) => FONT({ font: font || EFonts.gilroy })}

  ${props => css`
    ${MARGIN(props)}

    ${props.size &&
    css`
      font-size: ${props.size};
    `}

    color: ${props.color || EColors.black};

    text-align: ${props.align || 'auto'};
  `}
`

export const H1 = styled(StyledText)`
  font-size: 28px;
  line-height: 34px;
`

export const H1SemiBold = styled(StyledText)`
  font-size: 28px;
  line-height: 34px;
  font-weight: ${weight};
`

export const H2SemiBold = styled(StyledText)`
  font-size: 24px;
  line-height: 30px;
  font-weight: ${weight};
`

export const H2 = styled(StyledText)`
  font-size: 24px;
  line-height: 30px;
`

export const H3 = styled(StyledText)`
  font-size: 18px;
  line-height: 21px;
`

export const H3SemiBold = styled(StyledText)`
  font-size: 18px;
  line-height: 21px;
  font-weight: ${weight};
`

// Large
export const LSemibold = styled(StyledText)`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${weight};
`

export const LMedium = styled(LSemibold)`
  line-height: 24px;
  font-weight: 500;
`

export const LRegular = styled(LSemibold)`
  line-height: 23.2px;
  font-weight: 400;
`

// Medium
export const MSemibold = styled(StyledText)`
  font-size: 14px;
  line-height: 16.8px;
  font-weight: ${weight};
`

export const MMedium = styled(MSemibold)`
  line-height: 17.5px;
  font-weight: 500;
`

export const MRegular = styled(MSemibold)`
  line-height: 20.3px;
  font-weight: 400;
`

// Small
export const SMedium = styled(StyledText)`
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
`

export const SRegular = styled(SMedium)`
  line-height: 18px;
  font-weight: 400;
`

export const FlexWrapper = styled(View)<TFlexWrapper>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  max-width: 100%;

  ${props => MARGIN(props)}
`
export const Touchable = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TFlexWrapper & { padding?: number }>`
  display: flex;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  max-width: 100%;
  padding: ${({ padding }) => padding || 0}px;

  ${props => MARGIN(props)}
`

export const Hr = styled(View)<THr>`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color || EColors.grey_800};

  ${({ vertical }) =>
    vertical &&
    css`
      width: 1px;
      height: 100%;
    `}

  ${props => MARGIN(props)}
`

export const Divider = styled(View)<TDivider>(
  ({ width, height, background }) => `
  width: ${width || 0}px;
  height: ${height || 0}px;
  background-color: ${background || 'transparent'};
`,
)
