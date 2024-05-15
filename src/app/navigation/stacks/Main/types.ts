import { TDrawerStack } from '../../drawer/types'
import { TNavigatorScreenParams } from '../../types'
import { TAuthStack } from '../Auth'
import { EStacks } from '../stacks'

export type TMainStack = {
  [EStacks.Auth]: TNavigatorScreenParams<TAuthStack>
  [EStacks.Drawer]: TNavigatorScreenParams<TDrawerStack>
}
