import React from 'react'
import { View } from 'react-native'

import { Icon } from '../../Icon'
import { EColors, Styled } from '../../Styled'

import * as S from './styled'
import { TAdventureProps } from './types'

export const Adventure = ({
  title,
  count = 2,
  onPress = () => {},
}: TAdventureProps) => {
  return (
    <S.Button onPress={onPress}>
      <S.CIcon>
        <View>
          <Icon name={'CalendarCount'} size={24} />

          {!!count && (
            <S.CCount>
              <S.Count>{count}</S.Count>
            </S.CCount>
          )}
        </View>
      </S.CIcon>

      <Styled.H3SemiBold>{title}</Styled.H3SemiBold>

      <S.CArrow>
        <Icon name={'ArrowRightNew'} size={20} fill={EColors.transparent} />
      </S.CArrow>
    </S.Button>
  )
}
