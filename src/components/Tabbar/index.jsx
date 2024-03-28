import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks';

import styles from './styles.module.scss';
import { RiHome2Line, RiHeart3Line, RiLogoutBoxLine   } from "react-icons/ri";

export const Tabbar = () => {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    {
      id: 'home',
      name: 'Home',
      icon: <RiHome2Line />,
      route: "/"
    },
    {
      id: 'favorites',
      name: 'Favorites',
      icon: <RiHeart3Line  />,
      route: "/favorites"
    }
  ]

  const handleNavigate = (path) => {
    navigate(path)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={styles.tabbar}>
      <div className={styles.container}>
        <span className={styles.logo} onClick={() => setIsOpen(!isOpen)}>
          YM
        </span>
        <nav>
          <ul className={styles.items}>
            { items.map((item) => (
              <li
                key={item.id}
                className={styles.item}
                id={item.route === location.pathname ? styles.active : ''}
                onClick={() => handleNavigate(item.route)}
              >
                {item.icon}
              </li>
            )) }
            <li
              className={styles.item}
              onClick={() => handleLogout()}
            >
              <RiLogoutBoxLine  />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}