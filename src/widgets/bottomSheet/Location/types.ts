export type TLocationBottSheetProps = {
  onClose?: () => void
  onSelectAddress?: (value: TPressAddress) => void
  goToMap?: () => void
}

export type TPressAddress = {
  radius?: number
  lat?: number
  lon?: number
  address?: string
  needTranslate?: boolean
}
