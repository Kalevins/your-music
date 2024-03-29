import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { Pagination } from '@/components'

describe('Pagination Component', () => {
  const setPaginationMock = vi.fn()
  const pagination = {
    offset: 0,
    limit: 20
  }
  const numberElements = 100
  const intervalElements = 20

  beforeEach(() => {
    render(
      <Pagination
        pagination={pagination}
        setPagination={setPaginationMock}
        numberElements={numberElements}
        intervalElements={intervalElements}
      />
    )
  })

  test('renders pagination', () => {
    const pagination = screen.getByRole('main')

    expect(pagination).toBeInTheDocument()
  })

  test('click on page', async () => {
    const numberPages = screen.getAllByRole('button')

    fireEvent.click(numberPages[3])

    expect(setPaginationMock).toHaveBeenCalledWith({
      offset: 40,
      limit: 20
    })
  })

  test('click on last page', async () => {
    const nextPage = screen.getByRole('button', { name: '>' })

    fireEvent.click(nextPage)

    expect(setPaginationMock).toHaveBeenCalledWith({
      offset: 80,
      limit: 20
    })
  })

  test('click on first page', async () => {
    const previousPage = screen.getByRole('button', { name: '<' })

    fireEvent.click(previousPage)

    expect(setPaginationMock).toHaveBeenCalledWith({
      offset: 0,
      limit: 20
    })
  })

  test('click on number items per page', async () => {
    const numberItemsPerPage = screen.getAllByRole('button')

    fireEvent.click(numberItemsPerPage[numberItemsPerPage.length - 1])

    expect(setPaginationMock).toHaveBeenCalledWith({
      offset: 0,
      limit: 100
    })
  })
})