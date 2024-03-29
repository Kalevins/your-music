import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { SearchInput } from '@/components'

describe('SearchInput Component', () => {
  const setSearchMock = vi.fn()
  const handleSearchMock = vi.fn()
  const suggestions = ['test', 'test1', 'test2', 'test3', 'test4', 'test5']

  beforeEach(() => {
    render(
      <SearchInput
        search='test'
        setSearch={setSearchMock}
        handleSearch={handleSearchMock}
        suggestions={suggestions}
      />
    )
  })

  test('renders the search input and button', () => {
    const searchInput = screen.getByPlaceholderText(/Search/i)
    const searchButton = screen.getByRole('button', { name: /Search/i })

    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('updates the search value when typing in the input', async () => {
    const searchInput = screen.getByPlaceholderText(/Search/i)

    fireEvent.change(searchInput, { target: { value: 'test1' } })

    expect(setSearchMock).toHaveBeenCalledWith('test1')
  })

  test('calls handleSearch when the search button is clicked', () => {
    const searchButton = screen.getByText('Search')

    fireEvent.click(searchButton)

    expect(handleSearchMock).toHaveBeenCalled()
  })

  test('renders suggestions when typing in the input', () => {
    const searchInput = screen.getByPlaceholderText(/Search/i)

    fireEvent.change(searchInput, { target: { value: 'test' } })

    const suggestionItems = screen.getAllByRole('listitem')

    expect(suggestionItems).toHaveLength(5)
    expect(suggestionItems[0]).toHaveTextContent('test')
    expect(suggestionItems[1]).toHaveTextContent('test1')
    expect(suggestionItems[2]).toHaveTextContent('test2')
    expect(suggestionItems[3]).toHaveTextContent('test3')
  })
})