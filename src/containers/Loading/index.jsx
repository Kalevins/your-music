import { Outlet } from 'react-router-dom'

import { LoadingScreen } from '@/components'
import { useLoading } from '@/hooks'

export function Loading () {
  const { isLoading } = useLoading()

  return (
    <>
      {isLoading && <LoadingScreen/>}
      <Outlet/>
    </>
  )
}
