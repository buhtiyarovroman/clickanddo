import React from 'react'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MMedium } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { TSelectItem } from '@/shared/ui/button/Select/types'
import { Button } from '@/shared/ui/button'
import { TUserCustomerProjectsHeaderProps } from './types'
import { EUserProjectsSortType } from '../../types'

export const Header = ({
  sortType = EUserProjectsSortType.new_to_old,
  onChangeSort = () => {},
}: TUserCustomerProjectsHeaderProps) => {
  const { t } = useTranslation()

  const onGetCurrentSelect = (
    value: TSelectItem,
    type: EUserProjectsSortType,
  ): TSelectItem => {
    const isChecked = sortType === type
    const order = type === EUserProjectsSortType.new_to_old ? -1 : 1

    return {
      ...value,
      icon: isChecked ? 'Checked' : undefined,
      onPress: () =>
        onChangeSort({
          type,
          order,
          sortBy: 'createdAt',
        }),
    }
  }

  const projectOptions: TSelectItem[] = [
    onGetCurrentSelect(
      {
        title: t('old_to_new'),
        type: 'custom',
        onPress: () => {},
      },
      EUserProjectsSortType.old_to_new,
    ),
    onGetCurrentSelect(
      {
        title: t('new_to_old'),
        type: 'custom',
        onPress: () => {},
      },
      EUserProjectsSortType.new_to_old,
    ),
  ]

  return (
    <FlexWrapper
      mTop="20px"
      mBottom="20px"
      flexDirection="row"
      justify="space-between"
      align="center"
      width="100%">
      <MMedium color={EColors.grey_800}>{t('sort_by')}</MMedium>

      <Button.Select
        reverseItem
        renderFromComponent={() => {
          return (
            <FlexWrapper flexDirection={'row'} width={'auto'}>
              <Icon name={'Sort'} size={14} />
              <MMedium mLeft={'8px'} color={EColors.grey_800}>
                {t(sortType)}
              </MMedium>
            </FlexWrapper>
          )
        }}
        items={projectOptions}
      />
    </FlexWrapper>
  )
}
