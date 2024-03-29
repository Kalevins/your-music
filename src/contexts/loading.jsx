import { useState, createContext } from 'react'

export const loadingContext = createContext({})

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (value) => {
    setIsLoading(value)
  }

  return (
    <loadingContext.Provider
      value={{
        isLoading,
        setLoading
      }}
    >
      {children}
    </loadingContext.Provider>
  )
}
