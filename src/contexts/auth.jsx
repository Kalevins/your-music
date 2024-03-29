import { useState, useEffect, createContext, useContext } from 'react'

import { decryptAES, encryptAES } from '@/utils'
import { getToken } from '@/services'
import { loadingContext } from '@/contexts'

export const authContext = createContext({})

export const AuthProvider = ({ children }) => {
  const { setLoading } = useContext(loadingContext)
  const [isValid, setIsValid] = useState(false)
  const [isInValidation, setIsInValidation] = useState(true)
  const [user, setUser] = useState(null)

  const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      getToken()
        .then((response) => {
          setIsValid(true)
          sessionStorage.setItem('token', response.access_token)
          sessionStorage.setItem('user', encryptAES(JSON.stringify({ username, password })))
            resolve()
        })
        .catch(() => {
          setIsValid(false)
            reject()
        })
    })
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
    if (userParsed.username && userParsed.password) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    setIsInValidation(false)
    setLoading(false)
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
