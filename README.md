# EstateHub - Real Estate Platform UI

EstateHub is a React-based real estate platform UI made for the capstone project. It allows users to browse properties, filter listings by price and location, open a property detail page, view property maps, save homes, and manage buyer enquiries.

## Problem Definition

People searching for homes often need a simple interface where they can compare listings quickly. This project solves that by providing a property listing dashboard with search, filters, sorting, detail pages, and enquiry management.

## Tech Stack

- Frontend: React with Vite
- State management: React Context API with `useReducer`
- Routing: React Router
- Styling: CSS
- Data integration: Fetch API with a local JSON endpoint
- Public API: Google Maps Embed API
- API key handling: Vite `.env` variable
- Storage: localStorage for saved homes and buyer enquiries

## Key Features

- Property listings with images, price, location, area, bedrooms, and status
- Filters for search, city, property type, price range, and sort order
- Property detail page for each listing
- Save or remove properties from the saved list with localStorage persistence
- Enquiry form on the property detail page
- Buyer enquiries page with CRUD operations
- Property location map on each detail page
- Dark mode toggle
- Pagination for property listings
- Responsive layout for desktop and mobile screens

## Requirement Mapping

- DOM and JavaScript: React DOM rendering, controlled forms, `FormData`, `document.title`, and `scrollIntoView`
- React, Hooks, Routing: `useState`, `useEffect`, `useMemo`, custom hook, React Router pages
- API integration: `fetch` reads property data from `/api/properties.json`
- Public API and API key: Google Maps Embed API uses `VITE_GOOGLE_MAPS_API_KEY`
- Context API: global provider manages saved properties, enquiries, and theme
- CRUD operations: buyer enquiries can be created, read, updated by status, and deleted
- Error handling: API failures show user-friendly error messages and an Error Boundary catches UI crashes
- Deployment ready: production build generates the `dist` folder

## Advanced Features Used

1. Search, filter, and sort
2. Pagination
3. Dark mode toggle
4. Debounced search input
5. Error Boundary implementation
6. Performance optimization with `useMemo`
7. CRUD operations for buyer enquiries
8. API loading and error states
9. Public API key integration for maps
10. localStorage persistence

## How To Run

1. Open terminal in the project folder:

```bash
cd "c:\Users\sk811\OneDrive\Desktop\CAPSTONE PROJECT 1ST YEAR\real-estate"
```

2. Install dependencies if needed:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Optional: create a `.env` file for Google Maps:

```text
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

5. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Viva Explanation

This project is a real estate platform UI built using React. It contains property listing cards, filters for price range, location, type, and search, sorting options, pagination, property detail pages, saved properties, an enquiry form, an enquiry management page, dark mode, and location maps. I used the Fetch API through a separate service file to load property data from a JSON endpoint, Google Maps Embed API for property locations, React Router for navigation, Context API with `useReducer` for shared app state, and localStorage so saved homes, theme, and enquiries stay available after refreshing the page.

## API Key Note

The app is ready for a Google Maps API key, but the real key is not included for security. Create a local `.env` file and add `VITE_GOOGLE_MAPS_API_KEY`. If no key is added, the app still shows an external Google Maps location link.

## Deployment

The project can be deployed on Vercel or Netlify using these settings:

- Build command: `npm run build`
- Output folder: `dist`
