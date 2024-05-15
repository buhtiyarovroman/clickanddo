export type TAdditionalInfoBottomBarProps = {
  isEdit?: boolean
  getHeight?: (value: number) => void
  onSkip?: () => void
  onNext?: () => void
  onSave?: () => void
  valid?: boolean
}
