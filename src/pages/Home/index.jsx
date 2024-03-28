import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion'

import { getTracksByName } from '@/services';
import { useLoading, useLocalStorage } from '@/hooks';
import { Pagination, SearchInput } from '@/components';
import { suggestions } from '@/utils';

import styles from './styles.module.scss';
import { RiHeart3Line } from 'react-icons/ri';

export function Home() {
  const { setLoading } = useLoading()
  const [scope, animate] = useAnimate()
  const [favorites, setFavorites] = useLocalStorage('favorites', true)
  const navigate = useNavigate()
  const [tracks, setTracks] = useState([])
  const [search, setSearch] = useState('')
  const [searchAction, setSearchAction] = useState(false)
  const [numberElements, setNumberElements] = useState(0)
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20
  })

  useEffect(() => {
    setLoading(true)
    getTracksByName({
      ...pagination,
      name: "Droeloe"
    })
      .then((response) => {
        setTracks(response.tracks.items)
        setNumberElements(response.tracks.total)
        scrollToTop()
      })
      .finally(() => {
        setLoading(false)
        animate(`.${styles.screenAnimation}`, {scaleY: [1, 0], originY: 1}, {duration: 0.5})
        animate(`.${styles.track}`, {opacity: [0, 1]}, {duration: 1})
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    getTracksByName({
      ...pagination,
      name: search || "Droeloe"
    })
      .then((response) => {
        setTracks(response.tracks.items)
        setNumberElements(response.tracks.total)
        scrollToTop()
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

  const handleNavigate = async (path) => {
    await animate(`.${styles.screenAnimation}`, {scaleY: [0, 1], originY: 1}, {duration: 0.5})
    navigate(path)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const changeSearch = (value) => {
    setSearch(value)
  }

  return (
    <main className={styles.main} ref={scope}>
      <h1>Your Music</h1>
      <div className={styles.filters}>
        <SearchInput search={search} setSearch={changeSearch} handleSearch={handleSearch} suggestions={suggestions}/>
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
      <div className={styles.screenAnimation} />
    </main>
  )
}
