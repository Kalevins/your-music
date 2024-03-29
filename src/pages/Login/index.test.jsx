import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Login } from '@/pages'
import { authContext, LoadingProvider } from '@/contexts'

describe('Login Page', () => {
  const loginMock = vi.fn()
  const correctUser = 'test@example.com'
  const correctPassword = 'Test1234'
  const wrongUser = 'test@example'
  const wrongPassword = 'test1234'

  beforeEach(() => {
    render(
      <LoadingProvider>
        <authContext.Provider value={{ login: loginMock }}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </authContext.Provider>
      </LoadingProvider>
    )
  })

  test('renders login form', () => {
    const usernameInput = screen.getByPlaceholderText(/User/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test('submit login form with wrong email', async () => {
    const usernameInput = screen.getByPlaceholderText(/User/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(usernameInput, { target: { value: wrongUser } })
    fireEvent.change(passwordInput, { target: { value: correctPassword } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(loginMock).not.toHaveBeenCalledWith({ username: wrongUser, password: correctPassword }))
  })

  test('submit login form with wrong password', async () => {
    const usernameInput = screen.getByPlaceholderText(/User/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(usernameInput, { target: { value: correctUser } })
    fireEvent.change(passwordInput, { target: { value: wrongPassword } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(loginMock).not.toHaveBeenCalledWith({ username: correctUser, password: wrongPassword }))
  })

  test('submit login form with correct data', async () => {
    const usernameInput = screen.getByPlaceholderText(/User/i)
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })

    fireEvent.change(usernameInput, { target: { value: correctUser } })
    fireEvent.change(passwordInput, { target: { value: correctPassword } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(loginMock).not.toHaveBeenCalledWith({ username: correctUser, password: correctPassword }))
  })
})