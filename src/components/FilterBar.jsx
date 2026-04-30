function FilterBar({
  selectedLocation,
  setSelectedLocation,
  searchText,
  setSearchText,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
  onResetFilters,
  locations,
  propertyTypes,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search property..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <select
        value={selectedLocation}
        onChange={(event) => setSelectedLocation(event.target.value)}
      >
        <option value="All">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
      >
        <option value="All">All Types</option>
        {propertyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={selectedPriceRange}
        onChange={(event) => setSelectedPriceRange(event.target.value)}
      >
        <option value="All">Any Price Range</option>
        <option value="3000000-6000000">Rs. 30 Lakh - Rs. 60 Lakh</option>
        <option value="6000000-9000000">Rs. 60 Lakh - Rs. 90 Lakh</option>
        <option value="9000000-12000000">Rs. 90 Lakh - Rs. 1.2 Crore</option>
        <option value="12000000-16000000">Rs. 1.2 Crore - Rs. 1.6 Crore</option>
        <option value="16000000-25000000">Rs. 1.6 Crore - Rs. 2.5 Crore</option>
      </select>

      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="recommended">Recommended</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="areaHigh">Area: Largest First</option>
      </select>

      <button className="reset-filter-btn" type="button" onClick={onResetFilters}>
        Reset
      </button>
    </div>
  )
}

export default FilterBar
