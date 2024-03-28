import { Outlet } from 'react-router-dom'

import { Tabbar } from '@/components'

import styles from './styles.module.scss'

export const Menus = () => {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Outlet />
      </div>
      <Tabbar />
    </main>
  )
}
