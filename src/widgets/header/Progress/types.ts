export type TProgressHeaderProps = {
  title?: string
  onGoBack?: () => void
  count?: number
  page?: number
  activeTextProgress?: boolean
  hideProgress?: boolean
  isClose?: boolean
  onPressClose?: () => void
  withGoBack?: boolean
  needBackHandler?: boolean
}
