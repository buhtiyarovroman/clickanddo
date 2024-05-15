import { FlexWrapper, LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SkillContainer } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { TUserSpecialistSkillsProps } from './types'
import { Button } from '@/shared/ui/button'
import { EditSkillBottomSheet } from '../EditSkillBottomSheet'
import { THashTag } from '@/entities/User/models'
import { getTranslate } from '@/shared/utils'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const Skills = ({
  isEdit = false,
  hashtag = [],
}: TUserSpecialistSkillsProps) => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)
  const ref = useRef<TBottomSheetBaseRef | null>(null)
  const isShowMore = hashtag.length > 6

  const onSlice = () => {
    if (!showMore) {
      return hashtag.slice(0, 6)
    }

    return hashtag
  }

  const renderItem = (item: THashTag, index: number) => {
    const isLast = index + 1 === onSlice().length
    const isLastAll = index + 1 === hashtag.length

    return (
      <>
        <SkillContainer key={item._id}>
          <SRegular color={EColors.primary}>
            {getTranslate(item.title)}
          </SRegular>
        </SkillContainer>

        {isLast && isShowMore && !showMore && (
          <SkillContainer
            onPress={() => setShowMore(true)}
            color={EColors.primary}>
            <SRegular color={EColors.white}>{t('show_all_skills')}</SRegular>
          </SkillContainer>
        )}

        {isLastAll && showMore && (
          <SkillContainer
            onPress={() => setShowMore(false)}
            color={EColors.primary}>
            <SRegular color={EColors.white}>{t('show_less_skills')}</SRegular>
          </SkillContainer>
        )}
      </>
    )
  }

  const onOpen = () => {
    ref.current?.open()
  }

  const onClose = () => {
    ref.current?.close()
  }

  return (
    <>
      <FlexWrapper mTop={'20px'} mBottom={'20px'} flexDirection={'column'}>
        <FlexWrapper justify={'space-between'}>
          <LSemibold>{t('specialist_skills')}</LSemibold>

          {isEdit && <Button.IconButton onPress={onOpen} />}
        </FlexWrapper>

        <FlexWrapper
          mTop={'20px'}
          justify={'flex-start'}
          align={'flex-start'}
          wrap={'wrap'}>
          {onSlice().map(renderItem)}
        </FlexWrapper>
      </FlexWrapper>

      <EditSkillBottomSheet ref={ref} onClose={onClose} />
    </>
  )
}
