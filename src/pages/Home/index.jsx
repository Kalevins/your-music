import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import { useAuth } from '@/hooks';
import { LoadingScreen } from '@/components';
import { encryptAES } from '@/utils'

import styles from './styles.module.scss';

export function Home() {
  const { login, setValidated } = useAuth()
  const navigate = useNavigate()
  const [loadingLogin, setLoadingLogin] = useState(false)

  return (
    <>
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.textContainer}>
            <h1>Your Music</h1>
            <p>Welcome to Your Music, the best place to listen to music</p>
          </div>
        </div>
      </main>
    </>
  )
}
