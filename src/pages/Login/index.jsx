import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import { useAuth } from '@/hooks';
import { LoadingScreen } from '@/components';

import styles from './styles.module.scss';

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = ({ username, password }) => {
    setLoadingLogin(true)
    login({ username, password })
      .then(() => {
        navigate('/')
      })
      .finally(() => {
        setLoadingLogin(false)
      })
  }

  return (
    <>
      {loadingLogin && <LoadingScreen />}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.textContainer}>
            <h1>Your Music</h1>
            <p>Welcome to Your Music, the best place to listen to music</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              placeholder='User'
              {...register('username',
                {
                  required: "The user is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "The user must be an email"
                  }
                })
              }
            />
            <div className={styles.errorContainer}>
              <ErrorMessage
                errors={errors}
                name='username'
                render={({ message }) => <p className={styles.error}>{message}</p>}
                message=' '
              />
            </div>
            <input
              type='password'
              placeholder='Password'
              {...register('password',
                {
                  required: "The password is required",
                  minLength: {
                    value: 6,
                    message: "The password must have at least 6 characters"
                  },
                  maxLength: {
                    value: 12,
                    message: "The password must have at most 12 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/,
                    message: "The password must have at least one lowercase letter, one uppercase letter and one number"
                  }
                })
              }
            />
            <div className={styles.errorContainer}>
              <ErrorMessage
                errors={errors}
                name='password'
                render={({ message }) => <p className={styles.error}>{message}</p>}
                message=' '
              />
            </div>
            <button
              type='submit'
              className={errors.username || errors.password ? styles.secondary : styles.primary}
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
