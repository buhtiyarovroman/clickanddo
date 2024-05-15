export const onErrorCode = (error: string) => {
  if (error.includes('auth/invalid-verification-code')) {
    return 'toast.errors.invalid_code'
  }

  return 'toast.errors.empty'
}

export const onErrorBooking = (error: string) => {
  if (error.includes('Collision with another appointment')) {
    return 'toast.errors.colision_booking'
  }

  return 'toast.errors.empty'
}
