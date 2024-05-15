export type TDateValueBottomSheetProps = {
  title?: string
  onClose?: () => void
  setValue?: (value: TDateValue) => void
  value?: TDateValue
  isCreatedData?: boolean
}

export type TDateValue = {
  type: EDateValue
  dates?: {
    start: Date
    end: Date
  }
}

export enum EDateValue {
  anyDate = 'anyDate',
  today = 'today',
  yesterday = 'yesterday',
  tomorrow = 'tomorrow',
  thisWeek = 'thisWeek',
  thisMonth = 'thisMonth',
  everythingDayBefore = 'everythingDayBefore',
  select = 'select',
}
