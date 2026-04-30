import { createContext, useContext } from 'react'

export const PropertyContext = createContext()

export function useProperties() {
  const context = useContext(PropertyContext)

  if (!context) {
    throw new Error('useProperties must be used inside PropertyProvider.')
  }

  return context
}
