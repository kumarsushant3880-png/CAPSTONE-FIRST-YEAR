import { Link } from 'react-router-dom'
import { useProperties } from '../context/propertyStore'

function Navbar() {
  const { theme, toggleTheme } = useProperties()

  return (
    <nav className="navbar">
      <h2>EstateHub</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Properties</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/enquiries">Enquiries</Link>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
