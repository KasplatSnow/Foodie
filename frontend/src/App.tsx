import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Hello } from './Components/Users/Hello'
import SearchPage from './pages/search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hello />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
