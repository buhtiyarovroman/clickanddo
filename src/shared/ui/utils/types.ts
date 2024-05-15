import { EColors } from '../Styled'
import { EFonts } from './font'

export type TFont = {
  color?: EColors
  size?: string
  align?: 'center' | 'left' | 'right'
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  font?: EFonts
  style?: 'normal' | 'italic'
}

export type TMargin = {
  mTop?: string
  mLeft?: string
  mRight?: string
  mBottom?: string
}

export type TFlex = {
  direction?: TFlexDirectionVariants
  align?: TFlexAlignVariants
  justify?: TFlexJustifyVariants
  wrap?: TFlexWrapVariants
}

export type TColor = {
  color: EColors
}

export type TFlexDirectionVariants =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
export type TFlexAlignVariants =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
export type TFlexJustifyVariants =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
export type TFlexWrapVariants = 'wrap' | 'nowrap'
