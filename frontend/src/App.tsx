import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './Components/Auth/LoginForm'
import RegisterForm from './Components/Auth/RegisterForm'
import Home from './Components/Home/Home'
import SearchPage from './pages/search'
import RestaurantPage from './pages/restaurant'
import OwnerPage from './Components/User/OwnerPage'
import MapSearch from './Components/Restaurant/MapSearch'
import './App.css'
import SubmitReviewPage from './Components/Restaurant/Review'
import Logout from './Components/Auth/Logout'
import ProfilePage from './pages/profile'
// import { LoginProvider } from './context/login'
import { AuthProvider } from './Components/Auth/AuthContext'
import AdminPage from './Components/Restaurant/AdminPage'

function App() {
  return (
    // <LoginProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mapsearch" element={<MapSearch />} />
          <Route path="/restaurant" element={<RestaurantPage />} />
          <Route path="/review" element={<SubmitReviewPage />} />
          <Route path="/profile/owner" element={<OwnerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/restaurants" element={<AdminPage />} />
        </Routes>
      </Router>
      {/* </LoginProvider> */}
    </AuthProvider>
  )
}

export default App
