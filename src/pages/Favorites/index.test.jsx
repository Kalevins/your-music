import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as router from 'react-router'

import { Favorites } from '@/pages'
import { LoadingProvider, AuthProvider } from '@/contexts'
import { getTracksById } from '@/services'
import { useLocalStorage } from '@/hooks'

vi.mock('@/services')

vi.mock('@/hooks')

describe('Favorite Page', () => {
  const navigateMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock)
    getTracksById.mockResolvedValue({ tracks: [] })
    useLocalStorage.mockReturnValue([[], vi.fn()])
  })

  test('renders the Favorites page', () => {
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const favoritesElement = screen.getByRole('main')
    const title = screen.getByText('Your Music')

    expect(favoritesElement).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('shows message when there are no favorite tracks', async () => {
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const emptyMessage = screen.getByText(/favorites/i)

    expect(emptyMessage).toBeInTheDocument()
  })

  test('shows favorite tracks when there are some', async () => {
    useLocalStorage.mockReturnValue([['1'], vi.fn()])
    getTracksById.mockResolvedValue({
      tracks: [
        {id: '1', name: 'Track 1', album: { images: [{ url: 'image1.jpg' }] }, artists: [{ name: 'Artist 1' }] },
      ],
    })
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const track1 = await waitFor(() => screen.getByText('Track 1'))

    expect(track1).toBeInTheDocument()
  })

  test('can add a track to favorites', async () => {
    useLocalStorage.mockReturnValue([['1'], vi.fn()])
    getTracksById.mockResolvedValue({
      tracks: [
        {id: '1', name: 'Track 1', album: { images: [{ url: 'image1.jpg' }] }, artists: [{ name: 'Artist 1' }] },
      ],
    })
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const favoriteButton = await screen.findByTestId('1')

    fireEvent.click(favoriteButton)

    expect(useLocalStorage).toHaveBeenCalled()
  })

  test('can remove a track from favorites', async () => {
    useLocalStorage.mockReturnValue([['1'], vi.fn()])
    getTracksById.mockResolvedValue({
      tracks: [
        {id: '1', name: 'Track 1', album: { images: [{ url: 'image1.jpg' }] }, artists: [{ name: 'Artist 1' }] },
      ],
    })
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const favoriteButton = await screen.findByTestId('1')

    fireEvent.click(favoriteButton)
    fireEvent.click(favoriteButton)

    expect(useLocalStorage).toHaveBeenCalled()
  })

  test('can navigate to track details', async () => {
    useLocalStorage.mockReturnValue([['1'], vi.fn()])
    getTracksById.mockResolvedValue({
      tracks: [
        {id: '1', name: 'Track 1', album: { images: [{ url: 'image1.jpg' }] }, artists: [{ name: 'Artist 1' }] },
      ],
    })
    render(
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </AuthProvider>
      </LoadingProvider>
    )

    const track1 = await screen.findByText('Track 1')

    fireEvent.click(track1)

    expect(navigateMock).toHaveBeenCalledWith('/details/1')
  })
})