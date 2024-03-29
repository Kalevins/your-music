import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { authContext } from '@/contexts';

import styles from './styles.module.scss';
import { RiHome2Line, RiHeart3Line, RiLogoutBoxLine   } from "react-icons/ri";

export const Tabbar = () => {
  const { logout } = useContext(authContext)
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
    <div className={styles.tabbar} data-testid={'tabbar'}>
      <div className={styles.container}>
        <span className={styles.logo}>
          YM
        </span>
        <nav>
          <ul className={styles.items}>
            { items.map((item) => (
              <li
                key={item.id}
                className={styles.item}
                data-testid={item.id}
                id={item.route === location.pathname ? styles.active : ''}
                onClick={() => handleNavigate(item.route)}
              >
                {item.icon}
              </li>
            )) }
            <li
              className={styles.item}
              data-testid={"logout"}
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