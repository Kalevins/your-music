import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTracksById } from '@/services';
import { useLocalStorage } from '@/hooks';
import { loadingContext } from '@/contexts';

import styles from './styles.module.scss';
import { RiHeart3Line } from 'react-icons/ri';

export function Favorites() {
  const { setLoading } = useContext(loadingContext)
  const [favorites, setFavorites] = useLocalStorage('favorites', true)
  const navigate = useNavigate()
  const [tracks, setTracks] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    if (favorites.length === 0) {
      setIsEmpty(true)
      return
    }
    setLoading(true)
    getTracksById(favorites)
      .then((response) => {
        setTracks(response.tracks)
      })
      .catch(() => {
        setIsEmpty(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [favorites])

  const handleFavorite = (event, id) => {
    event.stopPropagation()
    const index = favorites.indexOf(id)
    if (index === -1) {
      favorites.push(id)
    } else {
      favorites.splice(index, 1)
    }
    setFavorites([...favorites])
  }

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <main className={styles.main}>
      <h1>Your Music</h1>
      <div className={styles.tracks}>
        {!isEmpty ? (
          tracks.map((track) => (
            <div
              key={track.id}
              className={styles.track}
              onClick={() => handleNavigate(`/details/${track.id}`)}
            >
              <div className={styles.imageContainer}>
                <img src={track.album.images[0].url} alt={track.name} />
                <button
                  className={styles.favorite}
                  data-testid={track.id}
                  id={favorites.includes(track.id) ? styles.active : ""}
                  onClick={(event) => handleFavorite(event, track.id)}
                >
                  <RiHeart3Line />
                </button>
              </div>
              <div className={styles.info}>
                <h3>{track.name}</h3>
                <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>To add a song to your favorites, go to the home page and click on the heart icon</h3>
        )}
      </div>
    </main>
  );
}
