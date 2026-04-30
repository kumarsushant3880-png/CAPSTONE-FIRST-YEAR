function LocationMap({ address, title }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const mapQuery = encodeURIComponent(address)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  if (!apiKey) {
    return (
      <section className="location-section">
        <h3>Property Location</h3>
        <p>{address}</p>
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          Open location in Google Maps
        </a>
      </section>
    )
  }

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${mapQuery}`

  return (
    <section className="location-section">
      <h3>Property Location</h3>
      <p>{address}</p>
      <iframe
        title={`${title} location map`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}

export default LocationMap
