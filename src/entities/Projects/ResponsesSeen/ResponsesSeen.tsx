import React from 'react'
import { useTranslation } from 'react-i18next'

import { IconWrapper, LastItem, StyledImage } from './styles'
import { TProjectResponsesSeenProps } from './types'
import { FlexWrapper, SMedium, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { TProjectResponse } from '../models'

export const ResponsesSeen = ({
  projectResponses = [],
  views = 0,
}: TProjectResponsesSeenProps) => {
  const { t } = useTranslation()

  const renderItem = (item: TProjectResponse, index: number) => (
    <React.Fragment key={item._id}>
      {projectResponses?.length > 5 && index === 4 ? (
        <LastItem key={item._id} index={index}>
          <SMedium mRight="3px" color={EColors.grey_800}>
            +{projectResponses?.length - 4}
          </SMedium>
        </LastItem>
      ) : (
        <StyledImage
          key={item._id}
          index={index}
          source={item?.photo}
          type={'user'}
        />
      )}
    </React.Fragment>
  )

  return (
    <FlexWrapper mTop={'12px'} justify={'space-between'} align={'center'}>
      <FlexWrapper width={'70%'} justify={'flex-start'}>
        {!!projectResponses.length && (
          <>
            <SMedium color={EColors.grey_500} mRight="8px">
              {t('responded')}
            </SMedium>
            <FlexWrapper width={'auto'}>
              {projectResponses.slice(0, 5).map(renderItem)}
            </FlexWrapper>
          </>
        )}
        {!projectResponses.length && (
          <>
            <SMedium color={EColors.grey_500} mRight="8px">
              {t('empty.feedback')}
            </SMedium>
          </>
        )}
      </FlexWrapper>
      <FlexWrapper width="30%" justify="flex-end" align="center">
        <IconWrapper>
          <Icon size={24} name={'Eye2'} />
        </IconWrapper>
        <SRegular color={EColors.grey_500}>{views}</SRegular>
      </FlexWrapper>
    </FlexWrapper>
  )
}
