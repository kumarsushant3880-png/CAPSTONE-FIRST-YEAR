const PROPERTIES_URL = '/api/properties.json'
const ENQUIRIES_KEY = 'propertyEnquiries'

export async function getProperties() {
  const response = await fetch(`${PROPERTIES_URL}?updated=${Date.now()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Unable to load properties from API.')
  }

  return response.json()
}

export async function getPropertyById(id) {
  const properties = await getProperties()
  return properties.find((property) => property.id === Number(id))
}

export async function createEnquiry(enquiry) {
  const enquiries = JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]')
  const newEnquiry = {
    id: crypto.randomUUID(),
    status: 'New',
    createdAt: new Date().toISOString(),
    ...enquiry,
  }

  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([newEnquiry, ...enquiries]))
  return newEnquiry
}

export async function getEnquiries() {
  return JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]')
}

export async function updateEnquiryStatus(id, status) {
  const enquiries = await getEnquiries()
  const updatedEnquiries = enquiries.map((enquiry) =>
    enquiry.id === id ? { ...enquiry, status } : enquiry,
  )

  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updatedEnquiries))
  return updatedEnquiries
}

export async function deleteEnquiry(id) {
  const enquiries = await getEnquiries()
  const updatedEnquiries = enquiries.filter((enquiry) => enquiry.id !== id)

  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updatedEnquiries))
  return updatedEnquiries
}
