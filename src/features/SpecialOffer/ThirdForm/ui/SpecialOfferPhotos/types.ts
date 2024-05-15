export type TSpecialOfferPhotosProps = {
  images?: {
    id: string
    path: string
  }[]
  onChange?: (
    value: {
      id: string
      path: string
    }[],
  ) => void
}
