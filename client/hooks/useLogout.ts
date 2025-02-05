import { COOKIE_KEY_AUTH_REFRESH_TOKEN, COOKIE_KEY_AUTH_TOKEN } from 'constants/cookie-keys'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import useMenuStore from 'stores/useMenuStore'
import useUserStore from 'stores/useUserStore'

export default function useLogout() {
  const router = useRouter()

  const { resetState: resetUserState } = useUserStore()
  const { resetState: resetMenuState } = useMenuStore()

  const handleLogout = useCallback(() => {
    Cookies.remove(COOKIE_KEY_AUTH_TOKEN)
    Cookies.remove(COOKIE_KEY_AUTH_REFRESH_TOKEN)
    resetUserState()
    resetMenuState()
    router.push('/login')
  }, [resetUserState, resetMenuState, router])

  return { handleLogout }
}
