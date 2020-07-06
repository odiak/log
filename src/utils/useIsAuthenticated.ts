import { useState, useEffect } from 'react'
import { authService } from '../services/client/authService'

export function useIsAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    return authService.onAuthStateChanged(({ signedIn }) => {
      setIsAuthenticated(signedIn)
    })
  }, [])

  return isAuthenticated
}
