export type TStandardModalProps = {
  onPressAgree?: () => void
  onPressDisagree?: () => void
  title?: string
}

export type TStandardModalRef = {
  open: () => void
  close: () => void
}
