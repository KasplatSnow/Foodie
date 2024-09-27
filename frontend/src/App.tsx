import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Hello } from './Components/Users/Hello'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hello />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
