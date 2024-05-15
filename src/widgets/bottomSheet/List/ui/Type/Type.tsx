import { EPublicationType } from '@/entities/Publication/models'
import { iconMapping } from '@/features/Publication/iconConfig'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  Hr,
  MRegular,
  MSemibold,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TypeItem } from './styled'
import { TListFilterTypeProps } from './types'

const data = [
  EPublicationType.skillbox,
  EPublicationType.specialOffer,
  EPublicationType.publication,
]

export const Type = ({
  selected = [],
  setSelected = () => {},
}: TListFilterTypeProps) => {
  const { t } = useTranslation()

  const _onChange = (isActive: boolean, value: EPublicationType) => {
    if (isActive) {
      setSelected(selected.filter(item => item !== value))
      return
    }

    setSelected([...selected, value])
  }

  const renderItem = (item: EPublicationType, index: number) => {
    const isLast = index === 2
    const isActive = selected.includes(item)

    return (
      <React.Fragment key={item}>
        <TypeItem onPress={() => _onChange(isActive, item)}>
          <FlexWrapper width={'auto'}>
            <Icon name={iconMapping[item]} />
            <MRegular mLeft={'8px'}>{t(`list_filter.${item}`)}</MRegular>
          </FlexWrapper>
          <Input.Checkbox
            value={isActive}
            onChange={() => _onChange(isActive, item)}
          />
        </TypeItem>

        {!isLast && <Hr color={EColors.grey_200} />}
      </React.Fragment>
    )
  }
  return (
    <FlexWrapper flexDirection={'column'} align={'flex-start'}>
      <MSemibold>{t('announcement_type')}</MSemibold>
      {data.map(renderItem)}
    </FlexWrapper>
  )
}
