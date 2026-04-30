import { Link, NavLink } from 'react-router-dom'
import { useProperties } from '../context/propertyStore'

function Navbar() {
  const { theme, toggleTheme } = useProperties()

  return (
    <nav className="navbar">
      <Link className="brand-mark" to="/">
        <span>EstateHub</span>
        <small>Premium Realty</small>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#properties">Listings</a>
        <a href="/#markets">Locations</a>
        <a href="/#services">Services</a>
        <NavLink to="/saved">Saved</NavLink>
        <NavLink to="/enquiries">Leads</NavLink>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
