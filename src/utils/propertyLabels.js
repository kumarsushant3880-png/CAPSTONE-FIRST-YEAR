export function getBhkLabel(property) {
  if (property.type === 'Studio') {
    return 'Studio'
  }

  return `${property.bedrooms} BHK`
}

export function getBathLabel(bathrooms) {
  return `${bathrooms} ${bathrooms === 1 ? 'Bath' : 'Baths'}`
}

export function getAreaLabel(area) {
  return `${area.toLocaleString()} sq ft`
}
