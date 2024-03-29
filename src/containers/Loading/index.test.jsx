import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from '@/containers'
import { loadingContext } from '@/contexts'

describe('Loading Component', () => {
  test('renders the loading screen when isLoading is true', () => {
    render(
      <loadingContext.Provider value={{ isLoading: true }}>
        <Loading />
      </loadingContext.Provider>
    )

    const loadingScreen = screen.queryByTestId('loadingScreen')

    expect(loadingScreen).toBeInTheDocument()
  })

  test('does not render the loading screen when isLoading is false', () => {
    render(
      <loadingContext.Provider value={{ isLoading: false }}>
        <Loading />
      </loadingContext.Provider>
    )

    const loadingScreen = screen.queryByTestId('loadingScreen')

    expect(loadingScreen).not.toBeInTheDocument()
  })
})