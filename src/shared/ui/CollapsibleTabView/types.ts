export type TCollapsibleTabViewProps = {
  headerHeight: number
  initialTabName: string
  data?: TCollapsibleTabViewData[]

  renderHeader?: () => JSX.Element
}

export type TCollapsibleTabViewData = {
  key: number
  label: string
  name: string
  Component: JSX.Element
}
