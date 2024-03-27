import { useState, useEffect } from 'react'

import { authContext } from '@/contexts'
import { decryptAES } from '@/utils'
import { useLoading } from '@/hooks'

export const AuthProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false)
  const [isInValidation, setIsInValidation] = useState(true)
  const [user, setUser] = useState(null)
  const { setLoading } = useLoading()

  const login = ({ username, password }) => {
    if (username && password) {
      return Promise.resolve()
    }
    return Promise.reject()
  }

  const logout = () => {
    setIsValid(false)
    sessionStorage.clear()
  }

  const validate = () => {
    setLoading(true)
    setIsInValidation(true)
    const user = decryptAES(sessionStorage.getItem('user'))
    const userParsed = JSON.parse(user) || {}
    login({ username: userParsed?.username, password: userParsed?.password })
      .then(() => {
        setIsValid(true)
      })
      .catch(() => {
        setIsValid(false)
      })
      .finally(() => {
        setLoading(false)
        setIsInValidation(false)
      })
  }

  const setValidated = (value) => {
    setIsValid(value)
  }

  const getUser = () => {
    const user = decryptAES(sessionStorage.getItem('user'))
    if (user) {
      return JSON.parse(user)
    }
  }

  useEffect(() => {
    if (!isValid && isInValidation) {
      validate()
    }
  }, [])

  useEffect(() => {
    if (isValid) {
      setUser(getUser())
    }
  }, [isValid])

  return (
    <authContext.Provider
      value={{
        isValid,
        setValidated,
        isInValidation,
        user,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
