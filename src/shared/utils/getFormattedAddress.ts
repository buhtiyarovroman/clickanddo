import { TAddressComponents } from './types'

export const getFormattedAddress = (
  address_components?: TAddressComponents,
) => {
  const city = address_components?.find(val =>
    val.types.includes('locality'),
  )?.long_name

  const country = address_components?.find(val =>
    val.types.includes('country'),
  )?.long_name

  if (city && country) {
    return `${city}, ${country}`
  }

  return ''
}

const space = (value: string) => {
  if (!value) {
    return ''
  }
  return value + ' '
}

const comma = (mass: string) => {
  if (!mass) {
    return ''
  }
  return ', '
}

export const formattedAddressLocation = (addresses: TAddressComponents) => {
  let street =
    addresses.find(el => el.types.includes('street_number'))?.short_name || ''

  let route = addresses.find(el => el.types[0] === 'route')?.short_name || ''

  let locality =
    addresses.find(el => el.types[0] === 'locality')?.long_name || ''
  let postal_code =
    addresses.find(el => el.types[0] === 'postal_code')?.long_name || ''

  let country = addresses.find(el => el.types[0] === 'country')?.long_name || ''

  let political =
    addresses.find(el => el.types[0] === 'political')?.long_name || ''

  let firstStr = `${space(street)}${space(route)}${political}`

  let secondStr = `${space(locality)}${postal_code}`

  return `${firstStr}${comma(firstStr)}${secondStr}${comma(
    secondStr,
  )}${country}`
}
