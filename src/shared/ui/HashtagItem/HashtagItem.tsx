import React from 'react'
import { THashtagItemProps } from './types'
import { SkillItem, SkillText } from './styled'
import { getTranslate } from '@/shared/utils'
import { TouchableOpacity } from 'react-native'
import { EColors } from '../Styled'
import { Icon } from '../Icon'

export const HashtagItem = ({
  showClose = false,
  onPressClose = () => {},
  isActive = false,
  onPress = () => {},
  ...hashtag
}: THashtagItemProps) => {
  const _onPressClose = () => {
    if (!hashtag?._id) {
      console.error('no have _id hashtag')
      return
    }
    onPressClose(hashtag._id)
  }

  const _onPress = () => {
    if (!hashtag) {
      console.error('no have press hashtag')

      return
    }

    onPress(hashtag)
  }

  return (
    <SkillItem isActive={isActive} onPress={_onPress}>
      <SkillText isActive={isActive}>
        {getTranslate(hashtag.title || [])}
      </SkillText>

      {showClose && (
        <TouchableOpacity onPress={_onPressClose}>
          <Icon name={'Close'} size={14} stroke={EColors.white} />
        </TouchableOpacity>
      )}
    </SkillItem>
  )
}
