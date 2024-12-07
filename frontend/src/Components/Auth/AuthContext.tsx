import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userRole: string
  userId: string | null
  logIn: (role: string, userId: string) => void
  logOut: () => void
}

// Define the type for AuthProvider's props
interface AuthProviderProps {
  children: ReactNode // Allow children to be passed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [userRole, setUserRole] = useState('')
  const [userRole, setUserRole] = useState<string>('admin')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  const [userId, setUserId] = useState<string | null>(null)

  const logIn = (role: string, userId: string) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setUserId(userId)
    console.log(`User logged in with role: ${role} and userId: ${userId}`)
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setUserRole('')
    setUserId(null)
    console.log('User logged out')
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userId, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
