import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'

import { Details } from '@/pages'
import { LoadingProvider, AuthProvider } from '@/contexts'
import { useLocalStorage } from '@/hooks'

vi.mock('@/services', () => ({
  getTrackById: () => Promise.resolve({
    id: 'test-id',
    name: 'Test Track',
    album: { name: 'Test Album', images: [{ url: 'test-image-url' }] },
    artists: [{ name: 'Test Artist' }],
    external_urls: { spotify: 'test-spotify-url' }
  })
}))

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn()
}))

describe('Details Page', () => {
  const navigateMock = vi.fn()
  const windowOpenMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock)
    vi.spyOn(window, 'open').mockImplementation(windowOpenMock)
    useLocalStorage.mockReturnValue([[], vi.fn()])
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Details />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )
  })

  test('renders the Details page', () => {
    const detailsElement = screen.getByRole('main')
    const title = screen.getByText('Your Music')

    expect(detailsElement).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('handles navigate click', async () => {
    const exitButton = screen.getByTestId('exit')

    fireEvent.click(exitButton)

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/'))
  })

  test('handles favorite click', () => {
    const favoriteButton = screen.getByTestId('favorite')

    fireEvent.click(favoriteButton)

    expect(useLocalStorage).toHaveBeenCalled()
  })

  test('handles open spotify click', () => {
    const spotyfyButton = screen.getByTestId('playSpotify')

    fireEvent.click(spotyfyButton)

    expect(windowOpenMock).toHaveBeenCalledWith('test-spotify-url', '_blank')
  })
})