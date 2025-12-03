'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'

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

  // Sync with Firebase auth state and localStorage
  useEffect(() => {
    setLoading(true)
    
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in with Firebase
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || undefined,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          profilePicture: firebaseUser.photoURL || null
        }
        
        // Save to localStorage
        if (userData.displayName) {
          localStorage.setItem('userDisplayName', userData.displayName)
        }
        if (userData.profilePicture) {
          localStorage.setItem('userPhoto', userData.profilePicture)
        }
        
        setUser(userData)
        setLoading(false)
      } else {
        // User is signed out - check localStorage as fallback
        try {
          const savedName = localStorage.getItem('userDisplayName')
          const savedPhoto = localStorage.getItem('userPhoto')
          
          if (savedName || savedPhoto) {
            setUser({
              displayName: savedName || '',
              profilePicture: savedPhoto || null
            })
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('Error loading user data:', error)
          setUser(null)
        }
        setLoading(false)
      }
    })
    
    // Listen for userDataUpdated events (from Settings page)
    const handleUserUpdate = () => {
      const savedName = localStorage.getItem('userDisplayName')
      const savedPhoto = localStorage.getItem('userPhoto')
      
      if (savedName || savedPhoto) {
        setUser({
          displayName: savedName || '',
          profilePicture: savedPhoto || null
        })
      }
    }
    
    // Listen for sign out events
    const handleSignOut = () => {
      setUser(null)
      setLoading(false)
    }
    
    window.addEventListener('userDataUpdated', handleUserUpdate)
    window.addEventListener('userSignedOut', handleSignOut)
    
    return () => {
      unsubscribe()
      window.removeEventListener('userDataUpdated', handleUserUpdate)
      window.removeEventListener('userSignedOut', handleSignOut)
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

