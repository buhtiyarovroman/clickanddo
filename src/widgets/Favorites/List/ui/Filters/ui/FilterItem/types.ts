export type TFilterItem = {
  isActive: boolean
  isFirst?: boolean
  onPress: () => void
  filter: EFavoritesFilters
}
export enum EFavoritesFilters {
  'All' = 'all',
  'Specialists' = 'specialists',
  'SpecialOffers' = 'special_offers',
  'SkillBoxes' = 'skillbox',
  'Publications' = 'publications',
}
