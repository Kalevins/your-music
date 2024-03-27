import { useEffect, useState } from 'react';

import { searchTrack } from '@/services';
import { useLoading, useLocalStorage } from '@/hooks';
import { Pagination } from '@/components';

import styles from './styles.module.scss';
import { RiHeart3Line } from 'react-icons/ri';

export function Home() {
  const { setLoading } = useLoading()
  const [favorites, setFavorites] = useLocalStorage('favorites', true)
  const [tracks, setTracks] = useState([])
  const [search, setSearch] = useState('Feeble Games')
  const [searchAction, setSearchAction] = useState(false)
  const [numberElements, setNumberElements] = useState(0)
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20
  })

  useEffect(() => {
    setLoading(true)
    searchTrack({
      ...pagination,
      name: search
    })
      .then((response) => {
        setTracks(response.tracks.items)
        setNumberElements(response.tracks.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [searchAction, pagination])

  const handleSearch = () => {
    setSearchAction(!searchAction)
  }

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
    window.open(path, '_blank', 'height=600,width=600')
  }

  return (
    <>
      <main className={styles.main}>
        <h1>Your Music</h1>
        <div className={styles.filters}>
          <div className={styles.search}>
            <input
              type='text'
              placeholder='Search for a song'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button onClick={() => handleSearch()} >Search</button>
          </div>
        </div>
        <div className={styles.tracks}>
          {tracks.map((track) => (
            <div
              key={track.id}
              className={styles.track}
              onClick={() => handleNavigate(`/details/${track.id}`)}
            >
              <div className={styles.imageContainer}>
                <img src={track.album.images[0].url} alt={track.name} />
                <button
                  className={styles.favorite}
                  id={favorites.includes(track.id) ? styles.active : ''}
                  onClick={(event) => handleFavorite(event, track.id)}
                >
                  <RiHeart3Line />
                </button>
              </div>
              <div className={styles.info}>
                <h3>{track.name}</h3>
                <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination numberElements={numberElements} pagination={pagination} setPagination={setPagination} intervalElements={10}/>
      </main>
    </>
  )
}
