import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LocationMap from '../components/LocationMap'
import Navbar from '../components/Navbar'
import { useProperties } from '../context/propertyStore'
import { getPropertyById } from '../services/propertyApi'
import { getAreaLabel, getBathLabel, getBhkLabel } from '../utils/propertyLabels'

function PropertyDetails() {
  const { id } = useParams()
  const { addEnquiry, savedProperties, toggleSaveProperty } = useProperties()
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [enquirySent, setEnquirySent] = useState(false)

  useEffect(() => {
    document.title = 'EstateHub | Property Details'

    getPropertyById(id)
      .then((apiProperty) => {
        setProperty(apiProperty || null)
        setError('')
      })
      .catch(() => {
        setError('Unable to load property details. Please try again later.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const isSaved = property
    ? savedProperties.some((item) => item.id === property.id)
    : false

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <p className="status-message">Loading property details from API...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <p className="error-message">{error}</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div>
        <Navbar />
        <div className="details-page">
          <h2>Property not found</h2>
          <Link to="/">Go Back</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <div className="details-page">
        <img src={property.image} alt={property.title} />

        <div className="details-content">
          <h1>{property.title}</h1>
          <p>{property.address}</p>

          <h2>Rs. {property.price.toLocaleString()}</h2>

          <div className="property-info">
            <span className="primary-chip">{getBhkLabel(property)}</span>
            <span>{getBathLabel(property.bathrooms)}</span>
            <span>{getAreaLabel(property.area)}</span>
            <span>{property.status}</span>
            <span>{property.type}</span>
          </div>

          <p>{property.description}</p>

          <div className="amenities-list">
            {property.amenities.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>

          <button
            className={isSaved ? 'save-btn saved details-save-btn' : 'save-btn details-save-btn'}
            type="button"
            onClick={() => toggleSaveProperty(property)}
          >
            {isSaved ? 'Saved' : 'Save Property'}
          </button>

          <Link className="back-btn" to="/">
            Back to Home
          </Link>

          <LocationMap address={property.address} title={property.title} />

          <form
            className="enquiry-form"
            onSubmit={async (event) => {
              event.preventDefault()
              const formData = new FormData(event.currentTarget)
              await addEnquiry({
                propertyId: property.id,
                propertyTitle: property.title,
                name: formData.get('name'),
                phone: formData.get('phone'),
                message: formData.get('message'),
              })
              setEnquirySent(true)
              event.currentTarget.reset()
            }}
          >
            <h3>Send Enquiry</h3>
            <input type="text" name="name" placeholder="Your name" required />
            <input type="tel" name="phone" placeholder="Phone number" required />
            <textarea
              name="message"
              placeholder="Message"
              defaultValue={`I am interested in ${property.title}.`}
            />
            <button type="submit">Contact Agent</button>
            {enquirySent && <p>Enquiry sent successfully.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
