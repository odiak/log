import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { authService } from '../services/client/authService'

const SignIn: FC<{}> = () => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(({ signedIn }) => {
      unsubscribe()
      if (signedIn) {
        router.push('/')
        return
      }

      ;(async () => {
        await authService.signIn()
        router.push('/')
      })()
    })
  }, [])

  return null
}

export default SignIn
