import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'

import { Home } from '@/pages'
import { LoadingProvider, AuthProvider } from '@/contexts'
import { useLocalStorage } from '@/hooks'

vi.mock('@/services', () => ({
  getTracksByName: () => Promise.resolve({
    tracks: {
      items: [
        {
          id: 'test-id',
          name: 'Test Track',
          album: { name: 'Test Album', images: [{ url: 'test-image-url' }] },
          artists: [{ name: 'Test Artist' }],
        }
      ],
      total: 1
    }
  })
}))

vi.mock('@/hooks')

describe('Home Page', () => {
  const navigateMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock)
    useLocalStorage.mockReturnValue([['1'], vi.fn()])
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )
  })

  test('renders the Home page', () => {
    const homeElement = screen.getAllByRole('main')[0]
    const title = screen.getByText('Your Music')

    expect(homeElement).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('can add a track to favorites', async () => {
    const favoriteButton = await screen.findByTestId('test-id')

    fireEvent.click(favoriteButton)

    expect(useLocalStorage).toHaveBeenCalled()
  })

  test('can remove a track from favorites', async () => {
    const favoriteButton = await screen.findByTestId('test-id')

    fireEvent.click(favoriteButton)
    fireEvent.click(favoriteButton)

    expect(useLocalStorage).toHaveBeenCalled()
  })

  test('can navigate to track details', async () => {
    const track = await screen.findByTestId('Test Track')

    console.log('track', track)
    fireEvent.click(track)

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/details/test-id'))
  })
})