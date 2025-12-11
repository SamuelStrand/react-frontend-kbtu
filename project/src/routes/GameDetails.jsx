import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchGameDetails } from '../services/apiService'
import FavoriteButton from '../components/FavoriteButton'

export default function GameDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = await fetchGameDetails(id, controller.signal)
        if (!cancelled) {
          setGame(data)
          setStatus('done')
        }
      } catch (e) {
        if (cancelled || e.name === 'AbortError') return
        setError(e.message || 'Unknown error')
        setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [id])

  if (status === 'loading') return <p>Loading…</p>
  if (status === 'error') return <p style={{ color: '#b00020' }}>Error: {error}</p>
  if (!game) return <p>Not found</p>

  const badge = (text) => (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        border: '1px solid #eee',
        borderRadius: 999,
        background: '#f8f8f8',
        fontSize: 12,
      }}
    >
      {text}
    </span>
  )

  return (
    <article>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 10, background: '#fff' }}
        >
          ← Back
        </button>
        <Link
          to="/"
          style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: 10, background: '#fff' }}
        >
          Home
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: 20,
          alignItems: 'start',
          border: '1px solid #eee',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(0,0,0,.06)',
        }}
      >
        <img src={game.thumbnail} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
            <h1 style={{ margin: '0 0 8px' }}>{game.title}</h1>
            <FavoriteButton gameId={game.id} />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {game.genre && badge(game.genre)}
            {game.platform && badge(game.platform)}
            {game.release_date && badge(`Released: ${game.release_date}`)}
          </div>

          {game.short_description && (
            <p style={{ margin: '0 0 12px', color: '#444' }}>{game.short_description}</p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {game.developer && (
              <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: '#777' }}>Developer</div>
                <div style={{ fontWeight: 600 }}>{game.developer}</div>
              </div>
            )}
            {game.publisher && (
              <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: '#777' }}>Publisher</div>
                <div style={{ fontWeight: 600 }}>{game.publisher}</div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {game.game_url && (
              <a
                href={game.game_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '10px 14px',
                  background: '#111',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                }}
              >
                Official site
              </a>
            )}
            {game.freetogame_profile_url && (
              <a
                href={game.freetogame_profile_url}
                target="_blank"
                rel="noreferrer"
                style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: 10, textDecoration: 'none' }}
              >
                Profile
              </a>
            )}
          </div>
        </div>
      </div>

      {game.description && (
        <section style={{ marginTop: 20 }}>
          <h2 style={{ margin: '0 0 8px' }}>Description</h2>
          <p style={{ whiteSpace: 'pre-line', color: '#333' }}>{game.description}</p>
        </section>
      )}
    </article>
  )
}
