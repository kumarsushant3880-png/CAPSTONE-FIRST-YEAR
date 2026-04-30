import { Link } from 'react-router-dom'
import { useProperties } from '../context/propertyStore'

function PropertyCard({ property }) {
  const { savedProperties, toggleSaveProperty } = useProperties()
  const isSaved = savedProperties.some((item) => item.id === property.id)

  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />

      <div className="property-card-content">
        <span className="status-badge">{property.status}</span>
        <h3>{property.title}</h3>
        <p>{property.address}</p>

        <div className="property-info">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} sq ft</span>
          <span>{property.type}</span>
        </div>

        <h4>Rs. {property.price.toLocaleString()}</h4>

        <button
          className={isSaved ? 'save-btn saved' : 'save-btn'}
          type="button"
          onClick={() => toggleSaveProperty(property)}
        >
          {isSaved ? 'Saved' : 'Save Property'}
        </button>

        <Link className="details-btn" to={`/property/${property.id}`}>
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard
