import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'
import SavedProperties from './pages/SavedProperties'
import Enquiries from './pages/Enquiries'
import ErrorBoundary from './components/ErrorBoundary'
import PropertyProvider from './context/PropertyContext'
import './App.css'

function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedProperties />} />
            <Route path="/enquiries" element={<Enquiries />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </PropertyProvider>
  )
}

export default App
