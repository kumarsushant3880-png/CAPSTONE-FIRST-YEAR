import { useEffect, useMemo, useRef, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import Navbar from '../components/Navbar'
import FilterBar from '../components/FilterBar'
import Footer from '../components/Footer'
import useDebounce from '../hooks/useDebounce'
import { getProperties } from '../services/propertyApi'

function Home() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [sortBy, setSortBy] = useState('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const propertySectionRef = useRef(null)
  const debouncedSearchText = useDebounce(searchText)
  const propertiesPerPage = 6

  useEffect(() => {
    document.title = 'EstateHub | Properties'

    getProperties()
      .then((apiProperties) => {
        setProperties(apiProperties)
        setError('')
      })
      .catch(() => {
        setError('Unable to load properties. Please try again later.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    propertySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage])

  function updateFilter(updateValue) {
    updateValue()
    setCurrentPage(1)
  }

  const sortedProperties = useMemo(() => {
    const filteredProperties = properties.filter((property) => {
      const matchesLocation =
        selectedLocation === 'All' || property.location === selectedLocation

      const searchValue = debouncedSearchText.toLowerCase()
      const matchesSearch =
        property.title.toLowerCase().includes(searchValue) ||
        property.location.toLowerCase().includes(searchValue) ||
        property.type.toLowerCase().includes(searchValue)

      const [minimumPrice, maximumPrice] =
        selectedPriceRange === 'All'
          ? [0, Number.MAX_SAFE_INTEGER]
          : selectedPriceRange.split('-').map(Number)

      const matchesPrice =
        property.price >= minimumPrice && property.price <= maximumPrice

      const matchesType = selectedType === 'All' || property.type === selectedType

      return matchesLocation && matchesSearch && matchesPrice && matchesType
    })

    return [...filteredProperties].sort((first, second) => {
      if (sortBy === 'priceLow') return first.price - second.price
      if (sortBy === 'priceHigh') return second.price - first.price
      if (sortBy === 'areaHigh') return second.area - first.area
      return first.id - second.id
    })
  }, [debouncedSearchText, properties, selectedLocation, selectedPriceRange, selectedType, sortBy])

  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage)
  const firstPropertyIndex = (currentPage - 1) * propertiesPerPage
  const paginatedProperties = sortedProperties.slice(
    firstPropertyIndex,
    firstPropertyIndex + propertiesPerPage,
  )

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section">
        <h1>Find Your Dream Property</h1>
        <p>Browse homes, apartments, and villas in top locations.</p>
      </section>

      <section className="property-section" ref={propertySectionRef}>
        <h2>Available Properties</h2>

        <FilterBar
          selectedLocation={selectedLocation}
          setSelectedLocation={(value) => updateFilter(() => setSelectedLocation(value))}
          searchText={searchText}
          setSearchText={(value) => updateFilter(() => setSearchText(value))}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={(value) => updateFilter(() => setSelectedPriceRange(value))}
          selectedType={selectedType}
          setSelectedType={(value) => updateFilter(() => setSelectedType(value))}
          sortBy={sortBy}
          setSortBy={(value) => updateFilter(() => setSortBy(value))}
        />

        {isLoading && <p className="status-message">Loading properties from API...</p>}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && sortedProperties.length > 0 ? (
          <p className="result-summary">
            Showing {firstPropertyIndex + 1}-
            {Math.min(firstPropertyIndex + propertiesPerPage, sortedProperties.length)} of{' '}
            {sortedProperties.length} properties
          </p>
        ) : null}

        {!isLoading && !error && paginatedProperties.length > 0 ? (
          <div className="property-grid">
            {paginatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : null}

        {!isLoading && !error && totalPages > 1 ? (
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        ) : null}

        {!isLoading && !error && sortedProperties.length === 0 ? (
          <p className="no-property">No property found.</p>
        ) : null}

      </section>
      <Footer />
    </div>
  )
}

export default Home
