'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface User {
  id?: string
  email?: string
  displayName: string
  profilePicture: string | null
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount and listen for updates
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedName = localStorage.getItem('userDisplayName')
        const savedPhoto = localStorage.getItem('userPhoto')
        
        if (savedName || savedPhoto) {
          setUser({
            displayName: savedName || '',
            profilePicture: savedPhoto || null
          })
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadUser()
    
    // Listen for userDataUpdated events (from Settings page)
    const handleUserUpdate = () => {
      loadUser()
    }
    
    window.addEventListener('userDataUpdated', handleUserUpdate)
    
    return () => {
      window.removeEventListener('userDataUpdated', handleUserUpdate)
    }
  }, [])

  // Update user and save to localStorage immediately
  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      const updated = prev ? { ...prev, ...updates } : { 
        displayName: updates.displayName || '', 
        profilePicture: updates.profilePicture || null 
      }
      
      // Immediately save to localStorage
      if (updated.displayName) {
        localStorage.setItem('userDisplayName', updated.displayName)
      } else {
        localStorage.removeItem('userDisplayName')
      }
      
      if (updated.profilePicture) {
        localStorage.setItem('userPhoto', updated.profilePicture)
      } else {
        localStorage.removeItem('userPhoto')
      }
      
      // Dispatch event for immediate navbar update
      window.dispatchEvent(new CustomEvent('userDataUpdated', { 
        bubbles: true,
        detail: updated
      }))
      
      return updated as User
    })
  }, [])

  // Set user completely (for sign in)
  const setUserComplete = useCallback((newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      if (newUser.displayName) {
        localStorage.setItem('userDisplayName', newUser.displayName)
      }
      if (newUser.profilePicture) {
        localStorage.setItem('userPhoto', newUser.profilePicture)
      }
    } else {
      localStorage.removeItem('userDisplayName')
      localStorage.removeItem('userPhoto')
    }
  }, [])

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser: setUserComplete, 
      updateUser,
      loading 
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

