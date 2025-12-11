import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from '../store/favoritesSlice'
import { fetchGameDetails } from '../services/apiService'
import GameCard from '../components/GameCard'

export default function Favorites() {
  const ids = useSelector(selectFavoriteIds)
  const [games, setGames] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!ids.length) {
      setGames([])
      return
    }
    let ignore = false
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        const result = await Promise.all(
          ids.map((id) => fetchGameDetails(id, controller.signal))
        )
        if (!ignore) {
          setGames(result)
          setStatus('done')
        }
      } catch (e) {
        if (ignore || e.name === 'AbortError') return
        setStatus('error')
        setError(e.message || 'Unknown error')
      }
    }

    load()

    return () => {
      ignore = true
      controller.abort()
    }
  }, [ids])

  if (!ids.length) {
    return <p>You do not have any favorites yet.</p>
  }

  return (
    <section>
      <h1>Your favorites</h1>
      {status === 'error' && <p className="gamesList__error">{error}</p>}
      <ul className="gamesList__grid">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </ul>
    </section>
  )
}
