import React, { useMemo } from 'react'
import ViewMoreText from 'react-native-view-more-text'
import { MRegular } from '../Styled/Styled'
import { EColors, Styled } from '../Styled'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TMoreTextProps } from './types'

export const MoreText = ({
  value = '',
  moreText = '',
  lessText = '',
  numberOfLines = 3,
  placeholder = '',
  TextComponent = 'MRegular',
}: TMoreTextProps) => {
  const { t } = useTranslation()
  const CurrentMoreText = moreText || t('more')
  const CurrentLessText = lessText || t('hide')

  const CurrentTextComponent = useMemo(
    () => Styled[TextComponent],
    [TextComponent],
  )

  const renderMoreText = (handlePress: () => void, isMore?: boolean) => {
    const currentText = isMore ? CurrentLessText : CurrentMoreText
    return (
      <TouchableOpacity onPress={handlePress}>
        <MRegular color={EColors.primary}>{currentText}</MRegular>
      </TouchableOpacity>
    )
  }

  return (
    <ViewMoreText
      numberOfLines={numberOfLines}
      renderViewMore={handlePress => renderMoreText(handlePress)}
      renderViewLess={handlePress => renderMoreText(handlePress, true)}>
      <CurrentTextComponent color={EColors.grey_600}>
        {value || placeholder}
      </CurrentTextComponent>
    </ViewMoreText>
  )
}
