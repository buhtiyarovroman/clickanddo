import React from 'react'
import { TUserOfferProps } from './types'
import {
  SectionContainer,
  StyledImage,
  DescContainer,
  DiscountWrapper,
  StyledLRegular,
  StyledMRegularLineThrough,
  StyledMRegular,
  InvalidContainer,
} from './styled'
import { FlexWrapper, Hr, MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Trans, useTranslation } from 'react-i18next'
import { Icon } from '@/shared/ui/Icon'
import { calculateTime } from './helper'
import { format } from 'date-fns'
import { currencyChars } from '@/shared/config'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '../store'

export const Offer = ({
  heading = '',
  images = [],
  onPress = () => {},
  width = '45%',
  minPrice = 0,
  maxPrice = 0,
  duration = 1000,
  date = new Date().toString(),
  rating = 0,
  isSkillBox = false,
  projects = 0,
  type,
  ...props
}: TUserOfferProps) => {
  const { t } = useTranslation()
  const photo = images[0] || ''
  const discount: number =
    props.price !== undefined &&
    props.oldPrice !== undefined &&
    props.oldPrice !== 0
      ? Number(
          (-((props.price - props.oldPrice) / props.oldPrice) * 100).toFixed(),
        )
      : 0

  const { setting } = useTypedSelector(getUserSelector)

  const isInvalid = type === 'special-offer' ? projects >= 1 : false

  return (
    <SectionContainer onPress={onPress} width={width} {...props}>
      <StyledImage source={photo} />

      {/* Top container */}
      <DescContainer>
        {/* Title */}
        <MRegular numberOfLines={1}>{heading}</MRegular>

        <FlexWrapper mTop={'5px'} justify={'space-between'} wrap={'wrap'}>
          {/* Price */}
          <MRegular color={EColors.grey_600}>
            {isSkillBox && (
              <FlexWrapper
                width={'auto'}
                justify={'flex-start'}
                align={'flex-end'}>
                {props.price === 0 && (
                  <StyledMRegular>{t('price_negotiable')}</StyledMRegular>
                )}
                {props.price !== 0 && (
                  <>
                    <StyledLRegular>
                      {currencyChars[setting.currency as 'USD'] ||
                        currencyChars.USD}
                      {props.price?.toFixed(2)}
                    </StyledLRegular>

                    {!!props.oldPrice && (
                      <StyledMRegularLineThrough>
                        {currencyChars[setting.currency as 'USD'] ||
                          currencyChars.USD}
                        {props.oldPrice?.toFixed(2)}
                      </StyledMRegularLineThrough>
                    )}
                    {!!discount && discount > 0 && (
                      <DiscountWrapper>
                        <StyledMRegular color={EColors.error}>
                          {discount}%
                        </StyledMRegular>
                      </DiscountWrapper>
                    )}
                  </>
                )}
              </FlexWrapper>
            )}
            {!isSkillBox && (
              <Trans
                i18nKey={'from_price'}
                values={{
                  price: (minPrice || 0).toFixed(2),
                  currency:
                    currencyChars[setting.currency as 'USD'] ||
                    currencyChars.EUR,
                }}
                components={{ color: <MRegular /> }}
              />
            )}
          </MRegular>

          {/* Hours */}
          <FlexWrapper mBottom="3px" align="flex-start" width={'auto'}>
            <Icon name={'Clock'} size={14} />

            <StyledMRegular mLeft={'5px'} color={EColors.grey_600}>
              {calculateTime(+duration, t)}
            </StyledMRegular>
          </FlexWrapper>
        </FlexWrapper>
      </DescContainer>
      <Hr color={EColors.grey_300} />

      {/* Bottom container */}
      <DescContainer>
        <FlexWrapper justify={isSkillBox ? 'center' : 'space-between'}>
          {!isSkillBox && (
            <MRegular color={EColors.grey_600}>
              {t('through')} {format(new Date(date), 'dd.MM')}
            </MRegular>
          )}
          <FlexWrapper width={'auto'}>
            <Icon name={'Star'} size={18} fill={EColors.warning} />

            <MRegular>{rating}</MRegular>
          </FlexWrapper>
        </FlexWrapper>
      </DescContainer>

      {isInvalid && (
        <InvalidContainer>
          <Icon name={'CloseRound'} />

          <MRegular mLeft={'5px'}>{t('inactive')}</MRegular>
        </InvalidContainer>
      )}
    </SectionContainer>
  )
}
