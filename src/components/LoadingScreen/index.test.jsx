import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

import { LoadingScreen } from '@/components'

describe('LoadingScreen Component', () => {
  beforeEach(() => {
    render(
      <LoadingScreen />
    )
  })

  test('renders loading screen', () => {
    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})