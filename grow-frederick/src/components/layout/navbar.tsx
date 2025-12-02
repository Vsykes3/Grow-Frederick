"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import { signOut as firebaseSignOut } from "@/lib/firebase"
import { 
  Menu, 
  X, 
  Sun, 
  User, 
  Settings, 
  LogOut,
  Home,
  Leaf,
  Calendar,
  MapPin,
  Bug,
  Newspaper,
  BookOpen,
  Info,
  Mail,
  CreditCard,
  UserCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LockBadge } from "@/components/ui/lock-badge"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useUser } from "@/contexts/UserContext"

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Plant Index', href: '/plant-index', icon: Leaf },
  { name: 'My Garden', href: '/my-garden', icon: UserCheck, requiresAuth: false },
  { name: 'Calendar', href: '/calendar', icon: Calendar, requiresAuth: false },
  { name: 'Weather', href: '/weather', icon: Sun, requiresAuth: false },
  { name: 'Map', href: '/map', icon: MapPin, requiresAuth: false },
  { name: 'Pests', href: '/pests', icon: Bug },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
]

export function Navbar() {
  const { data: session } = useSession()
  const { user: firebaseUser, loading: firebaseLoading } = useFirebaseAuth()
  const { user: contextUser } = useUser() // Get user from context
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Use context user (which updates immediately), fallback to Firebase/NextAuth
  const currentUser = contextUser ? {
    displayName: contextUser.displayName || '',
    email: contextUser.email || '',
    photoURL: contextUser.profilePicture || undefined
  } : (firebaseUser || (session?.user ? {
    displayName: session.user.name || '',
    email: session.user.email || '',
    photoURL: session.user.image || undefined
  } : null))

  const handleSignOut = async () => {
    if (firebaseUser) {
      await firebaseSignOut()
    } else {
      signOut({ callbackUrl: '/' })
    }
    setIsOpen(false)
    setShowUserMenu(false)
  }

  // Close user menu when clicking outside
  const userMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-16 items-center gap-1 sm:gap-2">
          {/* Logo - positioned at left */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <Image
              src="/GrowCommon.png"
              alt="GrowCommon Logo"
              width={32}
              height={32}
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain logo-transparent"
              priority
            />
            <span className="text-base sm:text-lg font-bold text-foreground hidden sm:inline">GrowCommon</span>
          </Link>

          {/* Desktop Navigation - scrollable on medium, full on large */}
          <div className="hidden md:flex items-center space-x-0.5 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = false // You can implement active state logic here
              
              if (item.requiresAuth && !session) {
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="sm"
                    onClick={() => signIn(undefined, { callbackUrl: item.href })}
                    className="flex items-center space-x-1 text-foreground hover:text-foreground px-1.5 sm:px-2 text-xs whitespace-nowrap flex-shrink-0"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </Button>
                )
              }

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-1 text-foreground px-1.5 sm:px-2 text-xs whitespace-nowrap flex-shrink-0"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden lg:inline">{item.name}</span>
                    {item.pro && session?.user?.plan === 'FREE' && (
                      <LockBadge size="sm" />
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right side actions - ensure it doesn't shrink */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu */}
            {currentUser ? (
              <div className="flex items-center space-x-1 sm:space-x-2 relative">
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1.5 sm:space-x-2 text-foreground px-2"
                  >
                    {currentUser.photoURL ? (
                      <Image
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'User'}
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-border"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold border-2 border-border">
                        {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    {currentUser.displayName && (
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium">{currentUser.displayName}</span>
                    )}
                  </Button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-border">
                        <div className="flex items-center space-x-3">
                          {currentUser.photoURL ? (
                            <Image
                              src={currentUser.photoURL}
                              alt={currentUser.displayName || 'User'}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-semibold">
                              {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {currentUser.displayName || 'User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link href="/settings">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-foreground"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSignOut}
                          className="w-full justify-start text-foreground"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    const event = new CustomEvent('openAuth', { detail: { mode: 'signin' } });
                    window.dispatchEvent(event);
                  }}
                  className="text-foreground hover:text-foreground px-2 sm:px-3 text-xs sm:text-sm whitespace-nowrap"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => {
                    const event = new CustomEvent('openAuth', { detail: { mode: 'signup' } });
                    window.dispatchEvent(event);
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 sm:px-3 text-xs sm:text-sm whitespace-nowrap"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t py-4">
            {/* Mobile User Info */}
            {currentUser && (
              <div className="px-4 py-3 mb-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  {currentUser.photoURL ? (
                    <Image
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {currentUser.displayName?.[0]?.toUpperCase() || currentUser.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {currentUser.displayName || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                
                if (item.requiresAuth && !currentUser) {
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        signIn(undefined, { callbackUrl: item.href })
                        setIsOpen(false)
                      }}
                      className="w-full justify-start text-foreground hover:text-foreground"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  )
                }

                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-foreground"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                      {item.pro && currentUser && (
                        <LockBadge size="sm" className="ml-auto" />
                      )}
                    </Button>
                  </Link>
                )
              })}
              {/* Mobile auth buttons */}
                  {!currentUser && (
                    <div className="pt-4 space-y-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const event = new CustomEvent('openAuth', { detail: { mode: 'signin' } });
                          window.dispatchEvent(event);
                          setIsOpen(false);
                        }}
                        className="w-full justify-start text-foreground"
                      >
                        Sign In
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const event = new CustomEvent('openAuth', { detail: { mode: 'signup' } });
                          window.dispatchEvent(event);
                          setIsOpen(false);
                        }}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

