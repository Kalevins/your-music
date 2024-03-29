import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion'

import { getTrackById } from '@/services';
import { useLocalStorage } from '@/hooks';
import { getTimeDuration } from '@/utils';
import { loadingContext } from '@/contexts';

import styles from './styles.module.scss';
import { RiHeart3Line, RiArrowGoBackFill  } from 'react-icons/ri';
import { FaSpotify } from "react-icons/fa6";

export function Details() {
  const [scope, animate] = useAnimate()
  const { setLoading } = useContext(loadingContext)
  const navigate = useNavigate()
  const [favorites, setFavorites] = useLocalStorage('favorites', true)
  const { id } = useParams()
  const [track, setTrack] = useState({})

  useEffect(() => {
    setLoading(true)
    getTrackById(id)
      .then((response) => {
        setTrack(response)
      })
      .finally(() => {
        setLoading(false)
        animate(`.${styles.screenAnimation}`, {scaleY: [1, 0], originY: 0}, {duration: 0.5})
      })
  }, [])

  const handleFavorite = (id) => {
    const index = favorites.indexOf(id)
    if (index === -1) {
      favorites.push(id)
    } else {
      favorites.splice(index, 1)
    }
    setFavorites([...favorites])
  }

  const handleOpenSpotify = (url) => {
    window.open(url, '_blank')
  }

  const handleNavigate = async () => {
    await animate(`.${styles.screenAnimation}`, {scaleY: [0, 1], originY: 0}, {duration: 0.5})
    navigate("/")
  }

  return (
    <div className={styles.container} ref={scope}>
      <main className={styles.main} >
          <div className={styles.backgroundImage} style={{backgroundImage: `url(${track?.album?.images[0]?.url})`}} />
          <h1>Your Music</h1>
          <div className={styles.track}>
            <h2>{track?.name}</h2>
            <div className={styles.info}>
              <div className={styles.item}>
                <h3>Album</h3>
                <h3>{track?.album?.name}</h3>
              </div>
              <div className={styles.item}>
                <h3>Duration</h3>
                <h3>{getTimeDuration(track?.duration_ms)}</h3>
              </div>
              <div className={styles.item}>
                <h3>Popularity</h3>
                <h3>{track?.popularity}</h3>
              </div>
              <div className={styles.item}>
                <h3>Explicit</h3>
                <h3>{track?.explicit ? 'Yes' : 'No'}</h3>
              </div>
            </div>
            <h2>{track?.artists?.map((artist) => artist.name).join(' - ')}</h2>
            <button
              className={styles.exit}
              data-testid="exit"
              onClick={() => handleNavigate()}
            >
              <RiArrowGoBackFill  />
            </button>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.favorite}
                data-testid="favorite"
                id={favorites.includes(track.id) ? styles.active : ''}
                onClick={() => handleFavorite(track.id)}
              >
                <RiHeart3Line />
              </button>
              <button
                className={styles.playSpotify}
                data-testid="playSpotify"
                onClick={() => handleOpenSpotify(track.external_urls.spotify)}
              >
                <FaSpotify />
              </button>
            </div>
          </div>
        <div className={styles.screenAnimation} />
      </main>
    </div>
  )
}
