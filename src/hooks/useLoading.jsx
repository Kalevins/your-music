import { useContext } from 'react'
import { loadingContext } from '@/contexts'

export const useLoading = () => {
  const context = useContext(loadingContext)
  if (!context) throw new Error('There is no Loading provider')
  return context
}