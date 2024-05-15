export type TValidationError = {
  statusCode: number
  message: {
    target: {
      dateOfBirth: string
      phone: string
      role: string
      name: string
      login: string
      secondName: string
      gender: string
      country: string
    }
    value: string
    property: string
    children: []
    constraints: { UniqLogin: string }
  }[]
  error: 'Bad Request'
}
