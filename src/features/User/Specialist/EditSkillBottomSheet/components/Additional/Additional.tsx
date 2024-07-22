import { EColors } from '@/shared/ui/Styled'
import { SRegular } from '@/shared/ui/Styled/Styled'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SkillItem, SkillsContainer } from './styled'
import { Search } from '../Search'
import { TAdditionalSkills } from './types'
import { THashTag } from '@/entities/User/models'
import { HashtagItem } from '@/shared/ui/HashtagItem'

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

  const renderItem = (item: THashTag) => (
    <HashtagItem
      key={item._id}
      {...item}
      isActive
      showClose
      onPressClose={() => onDeleteSkill(item._id)}
    />
  )

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
        {t('up_to_skills', { value: 15 })} ({skills.length}\15)
      </SRegular>

      {show && !isMax && (
        <Search mySkills={skills} onSelect={_onSelect} onClose={onClose} />
      )}
    </>
  )
}
