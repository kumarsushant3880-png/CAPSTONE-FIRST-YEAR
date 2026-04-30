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
  const propertiesPerPage = 12

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

  function resetFilters() {
    setSelectedLocation('All')
    setSearchText('')
    setSelectedPriceRange('All')
    setSelectedType('All')
    setSortBy('recommended')
    setCurrentPage(1)
  }

  function chooseLocation(location) {
    updateFilter(() => setSelectedLocation(location))
    propertySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const locations = useMemo(
    () => [...new Set(properties.map((property) => property.location))].sort(),
    [properties],
  )

  const propertyTypes = useMemo(
    () => [...new Set(properties.map((property) => property.type))].sort(),
    [properties],
  )

  const readyHomes = useMemo(
    () => properties.filter((property) => property.status === 'Ready to Move').length,
    [properties],
  )

  const marketCards = useMemo(
    () =>
      locations.map((location) => {
        const cityProperties = properties.filter((property) => property.location === location)
        const startingPrice = Math.min(...cityProperties.map((property) => property.price))

        return {
          location,
          count: cityProperties.length,
          startingPrice,
        }
      }),
    [locations, properties],
  )

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
  const hasActiveFilters =
    selectedLocation !== 'All' ||
    selectedType !== 'All' ||
    selectedPriceRange !== 'All' ||
    debouncedSearchText.trim() !== ''

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section">
        <div className="hero-content">
          <span>Verified homes in prime Indian cities</span>
          <h1>Find a home that feels premium from the first click.</h1>
          <p>
            Explore curated apartments, villas, studios, and family homes with clear
            pricing, smart filters, saved listings, enquiries, and map-based locations.
          </p>

          <div className="hero-actions">
            <a className="primary-action" href="#properties">
              Browse Listings
            </a>
            <a className="secondary-action" href="#services">
              Why EstateHub
            </a>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Project highlights">
        <div>
          <strong>{properties.length || '10'}+</strong>
          <span>Curated Properties</span>
        </div>
        <div>
          <strong>{locations.length || '3'}</strong>
          <span>Active Cities</span>
        </div>
        <div>
          <strong>{readyHomes || '8'}</strong>
          <span>Ready Homes</span>
        </div>
        <div>
          <strong>24 hr</strong>
          <span>Buyer Response Flow</span>
        </div>
      </section>

      <section className="section-panel" id="services">
        <div className="section-heading">
          <span>Built for real buyers</span>
          <h2>A polished property search experience</h2>
          <p>
            EstateHub combines clean UI, fast filtering, saved homes, enquiry tracking,
            and map-based detail pages to make the search journey simple and credible.
          </p>
        </div>

        <div className="service-grid">
          <article>
            <span>01</span>
            <h3>Smart Discovery</h3>
            <p>Search, sort, and filter listings by city, property type, and budget range.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Buyer Shortlist</h3>
            <p>Save favorite properties and revisit them without losing your selection.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Location Confidence</h3>
            <p>Property detail pages include address-focused map integration for clarity.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Lead Management</h3>
            <p>Enquiries can be created, tracked, updated, and deleted from one dashboard.</p>
          </article>
        </div>
      </section>

      <section className="section-panel market-panel" id="markets">
        <div className="section-heading">
          <span>Explore markets</span>
          <h2>Popular property locations</h2>
          <p>Tap a city to instantly filter listings for that market.</p>
        </div>

        <div className="market-grid">
          {marketCards.map((market) => (
            <button
              className="market-card"
              key={market.location}
              type="button"
              onClick={() => chooseLocation(market.location)}
            >
              <span>{market.location}</span>
              <strong>{market.count} listings</strong>
              <small>From Rs. {market.startingPrice.toLocaleString()}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="property-section" id="properties" ref={propertySectionRef}>
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
          onResetFilters={resetFilters}
          locations={locations}
          propertyTypes={propertyTypes}
        />

        {isLoading && <p className="status-message">Loading properties from API...</p>}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && sortedProperties.length > 0 ? (
          <p className="result-summary">
            Showing {firstPropertyIndex + 1}-
            {Math.min(firstPropertyIndex + propertiesPerPage, sortedProperties.length)} of{' '}
            {sortedProperties.length} {hasActiveFilters ? 'matching' : 'available'} properties
            {hasActiveFilters ? ` from ${properties.length} total` : ''}
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

      <section className="section-panel closing-panel">
        <div>
          <span>Ready for your viva demo</span>
          <h2>Professional UI with real project features</h2>
          <p>
            This interface demonstrates React routing, Context API, API data loading,
            CRUD enquiries, saved homes, debounced search, maps, responsive design, and
            polished user interactions.
          </p>
        </div>
        <a className="primary-action" href="#properties">
          View Listings
        </a>
      </section>

      <Footer />
    </div>
  )
}

export default Home
