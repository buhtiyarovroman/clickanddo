import { EColors } from '@/shared/ui/Styled'
import { SRegular } from '@/shared/ui/Styled/Styled'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SkillItem, SkillsContainer, SkillText } from './styled'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@/shared/ui/Icon'
import { Search } from '../Search'
import { TAdditionalSkills } from './types'
import { getTranslate } from '@/shared/utils'
import { THashTag } from '@/entities/User/models'

export const Additional = ({
  skills = [],
  setSkills = () => {},
}: TAdditionalSkills) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(true)

  const isEmpty = !skills.length

  const isMax = skills.length >= 15

  const onOpen = () => {
    setShow(true)
  }

  const onClose = () => {
    setShow(false)
  }

  const _onSelect = (value: THashTag) => {
    setSkills([...skills, value])
  }

  const onDeleteSkill = (id: string) => {
    setSkills(skills.filter(item => item._id !== id))
  }

  const renderItem = (item: THashTag) => {
    return (
      <SkillItem key={item._id}>
        <SkillText mRight={'5px'} color={EColors.white}>
          {getTranslate(item.title)}
        </SkillText>

        <TouchableOpacity onPress={() => onDeleteSkill(item._id)}>
          <Icon name={'Close'} size={14} stroke={EColors.white} />
        </TouchableOpacity>
      </SkillItem>
    )
  }

  return (
    <>
      <SRegular mLeft={'12px'} mBottom={'5px'} color={EColors.grey_500}>
        {t('main_specialization')}
      </SRegular>

      <SkillsContainer mBottom={'5px'}>
        {!isEmpty && <>{skills.map(renderItem)}</>}

        {!isMax && (
          <SkillItem background={EColors.transparent} onPress={onOpen}>
            <SRegular>{t('skills_search')}</SRegular>
          </SkillItem>
        )}
      </SkillsContainer>

      <SRegular mBottom={'20px'} color={EColors.grey_600}>
        {t('up_to_skills', { value: 15 })}
      </SRegular>

      {show && !isMax && (
        <Search mySkills={skills} onSelect={_onSelect} onClose={onClose} />
      )}
    </>
  )
}
