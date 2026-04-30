import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropertyCard from '../components/PropertyCard'
import { useProperties } from '../context/propertyStore'

function SavedProperties() {
  const { savedProperties } = useProperties()

  return (
    <div className="home-page">
      <Navbar />

      <section className="property-section">
        <h2>Saved Properties</h2>

        {savedProperties.length > 0 ? (
          <div className="property-grid">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="no-property">No saved properties yet.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default SavedProperties
