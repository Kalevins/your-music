import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks';

import styles from './styles.module.scss';
import logo from '@/assets/logos/logo.svg';
import { TbLogout2 } from 'react-icons/tb'

export const Tabbar = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    {
      id: 'home',
      name: 'Home',
      icon: <TbLogout2 />,
      routes: [
        { path: '/home' },
        { path: '/' },
      ]
    },
    {
      id: 'profile',
      name: 'Profile',
      icon: <TbLogout2 />,
      routes: [
        { path: '/profile' },
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <TbLogout2 />,
      routes: [
        { path: '/settings' },
      ]
    }
  ]

  const handleNavigate = (path) => {
    navigate(path)
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
                id={item.routes.find((route) => route.path === location.pathname) ? styles.active : ''}
                onClick={() => handleNavigate(item.id)}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            )) }
            <li onClick={() => {}}>
              <TbLogout2 />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}