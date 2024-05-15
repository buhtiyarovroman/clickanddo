import { THomeStack, TListStack } from '../../stacks'
import { TChatStack } from '../../stacks/Chat'
import { TNavigatorScreenParams } from '../../types'

export enum ETabStacks {
  Home = 'HomeTabStack',
  List = 'ListTabStack',
  Favorites = 'FavoritesTabStack',
  Chat = 'ChatTabStack',
  Projects = 'ProjectsTabStack',
}

export type TTabStack = {
  [ETabStacks.Home]: TNavigatorScreenParams<THomeStack>
  [ETabStacks.Favorites]: TNavigatorScreenParams<THomeStack>
  [ETabStacks.List]: TNavigatorScreenParams<TListStack>
  [ETabStacks.Projects]: TNavigatorScreenParams<THomeStack>
  [ETabStacks.Chat]: TNavigatorScreenParams<TChatStack>
}
