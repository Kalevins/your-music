import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Menus } from '@/containers'

describe('Menus', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Menus />
      </BrowserRouter>
    )
  })

  test('renders the Menus component', () => {
    const menusElement = screen.getByTestId('menus')

    expect(menusElement).toBeInTheDocument()
  })

  test('renders the Tabbar component', () => {
    const tabbarElement = screen.getByTestId('tabbar')

    expect(tabbarElement).toBeInTheDocument()
  })
})