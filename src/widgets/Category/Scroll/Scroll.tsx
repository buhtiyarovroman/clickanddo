import React, { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { useTranslation } from 'react-i18next'

import { TIconsKeys } from '@assets/Svg'
import { TInterest } from '@/entities/Interests/models/common'

import { Icon } from '@/shared/ui/Icon'
import { Loader } from '@/shared/ui/loader'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MMedium } from '@/shared/ui/Styled/Styled'

import * as S from './styles'
import { TCategoriesScrollProps } from './types'
import { AnimatedComponent } from './AnimatedComponent'

const M_BOTTOM = 6

export const Scroll = ({
  interests,
  selectedInterest,
  setSelectedInterest,
  loading,
  onEndReached,
  canGetMoreItems,
}: TCategoriesScrollProps) => {
  const { i18n, t } = useTranslation()

  const [openComponent, setOpenComponent] = useState<boolean>(false)
  const [singleHeight, setSingleHeight] = useState<number>(0)
  const [globalHeight, setGlobalHeight] = useState<number>(0)

  const handleSingleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setSingleHeight(height + M_BOTTOM)
  }

  const handleGlobalLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setGlobalHeight(height)
  }

  const currentIcon: TIconsKeys = openComponent
    ? 'AngleArrowUp'
    : 'AngleArrowDown'

  const renderItem = ({ item, index }: { item: TInterest; index: number }) => {
    const currentTitle =
      item.title?.find(el => el.lang === i18n.language)?.value || ''

    const isSelected = selectedInterest.includes(item._id)

    return (
      <S.InterestItem
        key={index}
        onPress={() => setSelectedInterest(item._id)}
        isSelected={isSelected}
        onLayout={handleSingleLayout}
        mBottom={M_BOTTOM}>
        <MMedium color={isSelected ? EColors.white : EColors.grey_700}>
          {currentTitle}
        </MMedium>
      </S.InterestItem>
    )
  }

  if (loading && interests.length === 0) return <Loader.Standard size={20} />

  return (
    <>
      <S.AbsoluteHeader>
        <FlexWrapper style={S.styles.wrapper}>
          <AnimatedComponent
            isOpen={openComponent}
            dataLength={interests.length}
            singleHeight={singleHeight}
            globalHeight={globalHeight}>
            <FlexWrapper
              wrap={'wrap'}
              align={'flex-start'}
              justify={'flex-start'}
              onLayout={handleGlobalLayout}>
              {/* <S.Filter onPress={openFilters}>
                <Icon name="Filter" size={16} />
              </S.Filter> */}

              {interests.map((item, index) => (
                <>{renderItem({ item, index })}</>
              ))}

              {/* TODO - Check */}
              {!!canGetMoreItems && (
                <S.InterestItem
                  isSelected
                  onPress={onEndReached}
                  mBottom={M_BOTTOM}>
                  <MMedium color={EColors.white}>{t('more')}... </MMedium>
                </S.InterestItem>
              )}
            </FlexWrapper>
          </AnimatedComponent>
        </FlexWrapper>

        <S.MoreButton onPress={() => setOpenComponent(!openComponent)}>
          <Icon name={currentIcon} fill={EColors.transparent} />
        </S.MoreButton>
      </S.AbsoluteHeader>
    </>
  )
}
