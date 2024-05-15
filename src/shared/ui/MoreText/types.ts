import { Styled } from '../Styled'

type TTextKey = keyof typeof Styled

export type TMoreTextProps = {
  value?: string
  moreText?: string
  lessText?: string
  numberOfLines?: number
  placeholder?: string
  TextComponent?: TTextKey
}
