import { useContext } from 'react'
import { authContext } from '@/contexts'

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}