export function getPageIdByAddressBarString (addressBar) {
  const pages = this.$store.state.pages
  const adresses = pages.map(page => page.address)
  const [number = '', street = '', city = '', state = '', postcode = ''] = addressBar.toString().split('_')
  const streetName = street.split('-').join(' ')
  const index = adresses
    .findIndex(address => address.streetNumber === number && address.streetName === streetName && address.city === city && address.state === state && address.postcode === postcode)
  return index < 0 ? null : pages[index].id
}
