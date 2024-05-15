import React, { useState } from 'react'
import { Container, ItemContainer, ItemsContainer, styles } from './styled'
import Popover from 'react-native-popover-view'
import { Platform } from 'react-native'
import { TSelectItem, TSelectProps } from './types'
import { EColors } from '../../Styled'
import { Icon } from '../../Icon'
import { LRegular } from '../../Styled/Styled'

export const Select = ({
  icon = 'VerticalDots',
  items,
  verticalOffset = Platform.OS === 'ios' ? 0 : -20,
  hideArrow = true,
  disabled = false,
  containerStyle = {},
  renderFromComponent,
  reverseItem = false,
}: TSelectProps) => {
  const [showPopover, setShowPopover] = useState(false)

  const onShow = () => {
    !disabled && items.length !== 0 && setShowPopover(true)
  }

  const margin = reverseItem
    ? {
        mRight: '6px',
      }
    : {
        mLeft: '6px',
      }

  const color = EColors.black

  const getColor = (item: TSelectItem) => {
    const type = item?.type

    if (type === 'custom') {
      return item.color
    }

    if (type === 'primary') {
      return EColors.primary
    }

    return color
  }

  return (
    <>
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={[styles.shadow, styles.popover]}
        backgroundStyle={styles.background}
        verticalOffset={verticalOffset}
        arrowSize={{ width: hideArrow ? 0 : 15, height: hideArrow ? 0 : 10 }}
        from={
          <Container style={containerStyle} onPress={onShow}>
            {renderFromComponent && renderFromComponent()}

            {!renderFromComponent && <Icon size={20} name={icon} />}
          </Container>
        }>
        <ItemsContainer>
          {items.map(val => (
            <ItemContainer
              reverseItem={reverseItem}
              key={val.title}
              onPress={() => {
                setShowPopover(false)
                setTimeout(() => {
                  val?.onPress?.()
                }, 300)
              }}>
              {val.icon && (
                <Icon name={val.icon} fill={getColor(val)} size={24} />
              )}

              <LRegular color={getColor(val)} {...margin}>
                {val.title}
              </LRegular>
            </ItemContainer>
          ))}
        </ItemsContainer>
      </Popover>
    </>
  )
}
