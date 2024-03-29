import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'

import { Tabbar } from '@/components'
import { authContext, LoadingProvider } from '@/contexts'

describe('Tabbar Component', () => {
  const logoutMock = vi.fn()
  const navigateMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock)
    render(
      <LoadingProvider>
        <authContext.Provider value={{ logout: logoutMock }}>
          <BrowserRouter>
            <Tabbar />
          </BrowserRouter>
        </authContext.Provider>
      </LoadingProvider>
    )
  })

  test('renders the tabbar items', () => {
    const homeItem = screen.getByTestId('home')
    const favoritesItem = screen.getByTestId('favorites')

    expect(homeItem).toBeInTheDocument()
    expect(favoritesItem).toBeInTheDocument()
  })

  test('navigates to the correct route when an item is clicked', () => {
    const homeItem = screen.getByTestId('home')
    const favoritesItem = screen.getByTestId('favorites')

    fireEvent.click(homeItem)
    expect(navigateMock).toHaveBeenCalledWith('/')

    fireEvent.click(favoritesItem)
    expect(navigateMock).toHaveBeenCalledWith('/favorites')
  })

  test('logs the user out when the logout button is clicked', () => {
    const logoutButton = screen.getByTestId('logout')

    fireEvent.click(logoutButton)

    expect(logoutMock).toHaveBeenCalled()
  })
})