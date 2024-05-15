import React from 'react'
import { TTabComponentProps } from './types'
import { Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { MainContainer, SecondContainer } from './styled'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { EProjectCardType } from '@/widgets/Projects/ProjectCard/types'

const { width } = Dimensions.get('window')
const TAB_WIDTH = width / 3.5

export const TabComponent = ({
  list = [],
  activeType = EProjectCardType.active,
  setType = () => {},
  ...props
}: TTabComponentProps) => {
  const { t } = useTranslation()
  const x = useSharedValue(0)

  const handlePress = (value: EProjectCardType, index: number) => {
    setType(value)
    x.value = withTiming(index * TAB_WIDTH)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    }
  })

  const renderItem = (item: EProjectCardType, index: number) => {
    const isActive = item === activeType

    const activeColor = isActive ? EColors.black : EColors.grey_600
    return (
      <TouchableOpacity
        key={item}
        style={styles.tab}
        onPress={() => handlePress(item, index)}>
        <MRegular color={activeColor}>{t(`tabs_list.${item}`)}</MRegular>
      </TouchableOpacity>
    )
  }

  return (
    <MainContainer {...props}>
      <SecondContainer>
        <Animated.View style={[styles.highlight, animatedStyle]} />
        {list.map(renderItem)}
      </SecondContainer>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: EColors.grey_200,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  highlight: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: '100%',
    backgroundColor: EColors.white,
    borderRadius: 8,
  },
  tab: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
  },
})
