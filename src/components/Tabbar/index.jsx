import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks';

import styles from './styles.module.scss';
import logo from '@/assets/logos/logo.svg';
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
        <div className={styles.logo} onClick={() => setIsOpen(!isOpen)}>
          <img src={logo} alt='logoImage' />
        </div>
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
                {/* <span>{item.name}</span> */}
              </li>
            )) }
            <li
              className={styles.item}
              onClick={() => handleLogout()}
            >
              <RiLogoutBoxLine  />
              {/* <span>Logout</span> */}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}