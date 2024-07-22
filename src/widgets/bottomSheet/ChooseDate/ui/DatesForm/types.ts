export type TSelectedDatesProps = {
  onChangeValid?: (value: boolean) => void
}

export type TGetFormProps = {
  selectedDate: Date
  selectedHours: Date
}

export type TSelectDatesRef = {
  getForm: () => TGetFormProps | null
}
