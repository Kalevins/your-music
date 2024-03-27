import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTrack } from '@/services';
import { useLoading, useLocalStorage } from '@/hooks';
import { getTimeDuration } from '@/utils';

import styles from './styles.module.scss';
import { RiHeart3Line } from 'react-icons/ri';
import { FaSpotify } from "react-icons/fa6";

export function Details() {
  const { setLoading } = useLoading()
  const [favorites, setFavorites] = useLocalStorage('favorites', true)
  const { id } = useParams()
  const [track, setTrack] = useState({})

  useEffect(() => {
    setLoading(true)
    getTrack(id)
      .then((response) => {
        console.log('response', response)
        setTrack(response)
      })
      .finally(() => {
        setLoading(false)
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

  const handleOpenSpotify = () => {
    window.open(track.external_urls.spotify, '_blank')
    window.close()
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.backgroundImage} style={{backgroundImage: `url(${track?.album?.images[0]?.url})`}} />
        <h1>Your Music</h1>
        <div className={styles.track}>
          <h2>{track?.name}</h2>
          <div className={styles.info}>
            <h3>{`Album: ${track?.album?.name}`}</h3>
            <h3>{`Duration: ${getTimeDuration(track?.duration_ms)}`}</h3>
            <h3>{`Popularity: ${track?.popularity}`}</h3>
            <h3>{`Explicit: ${track?.explicit ? 'Yes' : 'No'}`}</h3>
          </div>
          <h2>{track?.artists?.map((artist) => artist.name).join('- ')}</h2>
          <button
            className={styles.favorite}
            id={favorites.includes(track.id) ? styles.active : ''}
            onClick={() => handleFavorite(track.id)}
          >
            <RiHeart3Line />
          </button>
          <button
            className={styles.playSpotify}
            onClick={() => handleOpenSpotify()}
          >
            <FaSpotify />
          </button>
      </div>
      </main>
    </>
  )
}
