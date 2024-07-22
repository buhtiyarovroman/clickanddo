import React from 'react'
import { TUserReviewCardProps } from './types'
import { BlueDot, ReviewContainer, UserText, styles } from './styled'

import { FlexWrapper, LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { format } from 'date-fns'
import { View } from 'react-native'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'

export const ReviewCard = ({
  title = '',
  description = '',
  createdAt = new Date().toString(),
  mark,
  owner,
  width = '100%',
  isMyProfile,
  ...props
}: TUserReviewCardProps) => {
  const { navigate, push } = useNavigation()

  const isSpecialistMark = owner?.role === 'specialist'

  const customerMark =
    ((mark?.contactability || 0) +
      (mark?.cost || 0) +
      (mark?.price || 0) +
      (mark?.professionalism || 0) +
      (mark?.timing || 0)) /
    5

  const goProfile = () => {
    const id = owner?._id

    if (!id) {
      return
    }

    if (isMyProfile) {
      navigate(EScreens.JobStack, {
        screen: EScreens.JobProfile,
        params: { id },
      })
      return
    }

    push(EScreens.JobProfile, { id })
  }
  return (
    <ReviewContainer
      width={width}
      {...props}
      onPress={goProfile}
      style={styles.shadow}>
      {/* Rating */}
      <FlexWrapper mBottom={'8px'} width={'auto'}>
        <Icon size={14} name={'Star'} fill={EColors.warning} />
        <SRegular mLeft={'5px'} color={EColors.grey_500}>
          {isSpecialistMark ? mark?.mark : customerMark}
        </SRegular>
      </FlexWrapper>

      <FlexWrapper flexDirection={'column'} align={'flex-start'}>
        {/* Title Review */}
        <LSemibold>{title}</LSemibold>

        <FlexWrapper width={'auto'}>
          {/* user Name */}
          {owner && (
            <>
              <UserText>
                {owner?.name} {owner?.secondName}
              </UserText>

              <BlueDot />
            </>
          )}

          {/* CreatedAt */}
          <SRegular color={EColors.grey_500}>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
          </SRegular>
        </FlexWrapper>

        <SRegular mTop={'12px'} color={EColors.grey_500}>
          "{description}"
        </SRegular>

        <FlexWrapper justify={'space-between'}>
          {/* <MRegular>{price} UAH</MRegular> */}
          <View />
        </FlexWrapper>
      </FlexWrapper>
    </ReviewContainer>
  )
}
