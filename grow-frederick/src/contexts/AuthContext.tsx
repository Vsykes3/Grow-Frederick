"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext, ReactNode } from "react"

interface AuthContextType {
  currentUser: any
  signup: (email: string, password: string) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  
  const signup = async (email: string, password: string) => {
    // Stub implementation - replace with actual signup logic
    return { user: { email } }
  }
  
  const login = async (email: string, password: string) => {
    // Stub implementation - replace with actual login logic
    return { user: { email } }
  }
  
  const logout = async () => {
    // Stub implementation - replace with actual logout logic
  }
  
  return (
    <AuthContext.Provider
      value={{
        currentUser: session?.user || null,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

