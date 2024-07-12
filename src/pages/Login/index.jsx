import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { motion } from 'framer-motion';
import { BsInfoLg } from "react-icons/bs";

import { authContext } from '@/contexts';
import { LoadingScreen } from '@/components';

import styles from './styles.module.scss';

const variantsContainer = {
  open: {
    width: 'auto',
    transition: {
      stiffness: 400,
      restDelta: 2
    }
  },
  closed: {
    width: '0px',
    transition: {
      stiffness: 400,
      damping: 40
    }
  }
};

const variantsInfo = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const variantsText = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000
      }
    }
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000
      }
    }
  }
};

export function Login() {
  const { login } = useContext(authContext)
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  })

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, 5000)
  }, [])

  const onSubmit = async ({ username, password }) => {
    setLoadingLogin(true)
    try {
      await login({ username, password })
      navigate('/')
    } finally {
      setLoadingLogin(false)
    }
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
        <button className={styles.primary} id={styles.infoButton} onClick={() => {setIsOpen(!isOpen)}}>
          <BsInfoLg />
        </button>
        <motion.div
          initial={true}
          animate={isOpen ? "open" : "closed"}
          variants={variantsContainer}
          className={styles.infoContainer}
        >
          <motion.div
            className={styles.info}
            variants={variantsInfo}
          >
              <motion.p
                variants={variantsText}
              >
                To enter you do not need to register, just enter
              </motion.p>
              <motion.p
                variants={variantsText}
              >
                 the email and password that meet the conditions
              </motion.p>
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
