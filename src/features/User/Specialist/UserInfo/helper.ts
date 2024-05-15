export const getCurrentCount = (value: number) => {
  if (value >= 1000) {
    return Math.round(value / 1000).toFixed(1) + 'k'
  }

  return value + ''
}
