import { useEffect, useReducer } from 'react'
import { PropertyContext } from './propertyStore'
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from '../services/propertyApi'

const initialState = {
  savedProperties: [],
  enquiries: [],
  theme: 'light',
}

function appReducer(state, action) {
  if (action.type === 'SET_SAVED_PROPERTIES') {
    return { ...state, savedProperties: action.payload }
  }

  if (action.type === 'TOGGLE_SAVE_PROPERTY') {
    const alreadySaved = state.savedProperties.some(
      (property) => property.id === action.payload.id,
    )

    return {
      ...state,
      savedProperties: alreadySaved
        ? state.savedProperties.filter((property) => property.id !== action.payload.id)
        : [...state.savedProperties, action.payload],
    }
  }

  if (action.type === 'SET_ENQUIRIES') {
    return { ...state, enquiries: action.payload }
  }

  if (action.type === 'ADD_ENQUIRY') {
    return { ...state, enquiries: [action.payload, ...state.enquiries] }
  }

  if (action.type === 'SET_THEME') {
    return { ...state, theme: action.payload }
  }

  if (action.type === 'TOGGLE_THEME') {
    return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
  }

  return state
}

function PropertyProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const storedProperties = localStorage.getItem('savedProperties')
    const storedTheme = localStorage.getItem('theme')

    if (storedProperties) {
      dispatch({
        type: 'SET_SAVED_PROPERTIES',
        payload: JSON.parse(storedProperties),
      })
    }

    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme })
    }

    getEnquiries().then((enquiries) => {
      dispatch({ type: 'SET_ENQUIRIES', payload: enquiries })
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('savedProperties', JSON.stringify(state.savedProperties))
  }, [state.savedProperties])

  useEffect(() => {
    localStorage.setItem('theme', state.theme)
    document.body.classList.toggle('dark-theme', state.theme === 'dark')
  }, [state.theme])

  function toggleSaveProperty(property) {
    dispatch({ type: 'TOGGLE_SAVE_PROPERTY', payload: property })
  }

  async function addEnquiry(enquiry) {
    const createdEnquiry = await createEnquiry(enquiry)
    dispatch({ type: 'ADD_ENQUIRY', payload: createdEnquiry })
    return createdEnquiry
  }

  async function changeEnquiryStatus(id, status) {
    const updatedEnquiries = await updateEnquiryStatus(id, status)
    dispatch({ type: 'SET_ENQUIRIES', payload: updatedEnquiries })
  }

  async function removeEnquiry(id) {
    const updatedEnquiries = await deleteEnquiry(id)
    dispatch({ type: 'SET_ENQUIRIES', payload: updatedEnquiries })
  }

  function toggleTheme() {
    dispatch({ type: 'TOGGLE_THEME' })
  }

  return (
    <PropertyContext.Provider
      value={{
        savedProperties: state.savedProperties,
        enquiries: state.enquiries,
        theme: state.theme,
        toggleSaveProperty,
        addEnquiry,
        changeEnquiryStatus,
        removeEnquiry,
        toggleTheme,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider
