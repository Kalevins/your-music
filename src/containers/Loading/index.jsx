import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingScreen } from '@/components'
import { loadingContext } from '@/contexts'

export function Loading () {
  const { isLoading } = useContext(loadingContext)

  return (
    <>
      {isLoading && <LoadingScreen/>}
      <Outlet/>
    </>
  )
}
