import { TMargin } from '@/shared/ui/utils'
import { SharedValue } from 'react-native-reanimated'

export type TPaginationAnimationDotsProps = {
  length?: number
  currentIndex?: number
  dotMargin?: number
  x: SharedValue<number>
} & TMargin
