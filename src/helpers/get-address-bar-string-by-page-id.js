export function getAddressBarStringByPageId (id) {
  const pages = this.$store.state.pages
  const page = pages.find(page => page.id === id)
  if (!page) return 'live'
  const { streetNumber, streetName, city, state, postcode } = page.address
  return `${streetNumber}_${streetName.split(' ').join('-')}_${city}_${state}_${postcode}`
}
