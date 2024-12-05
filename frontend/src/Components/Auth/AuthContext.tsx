import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userRole: string | null
  userId: string | null // Add userId to the context
  logIn: (role: string, userId: string) => void // Accept userId in logIn
  logOut: () => void
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Provider component to wrap your app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const logIn = (role: string, userId: string) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setUserId(userId)
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setUserId(null)
  }

  const hasRole = (role: string) => isLoggedIn && userRole === role

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userId,
        logIn,
        logOut,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
