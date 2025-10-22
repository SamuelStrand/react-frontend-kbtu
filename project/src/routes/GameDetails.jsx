import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function GameDetails() {
    const { id } = useParams()
    const [game, setGame] = useState(null)
    const [status, setStatus] = useState('loading')
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        ;(async () => {
            setStatus('loading'); setError(null)
            try {
                // Детали игры
                const res = await fetch(`/ftg/game?id=${encodeURIComponent(id)}`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                if (!cancelled) { setGame(data); setStatus('done') }
            } catch (e) {
                if (!cancelled) { setError(e.message || 'Unknown error'); setStatus('error') }
            }
        })()
        return () => { cancelled = true }
    }, [id])

    if (status === 'loading') return <p>Loading…</p>
    if (status === 'error') return <p style={{color:'#b00020'}}>Error: {error}</p>
    if (!game) return <p>Not found</p>

    return (
        <article>
            <Link to="">&larr; Back</Link>
            <h1 style={{margin:'12px 0'}}>{game.title}</h1>
            <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16, alignItems:'start'}}>
                <img src={game.thumbnail} alt={game.title} style={{width:'100%', borderRadius:12}} />
                <div>
                    <p style={{marginTop:0}}>{game.description}</p>
                    <p style={{color:'#555'}}>
                        <strong>Genre:</strong> {game.genre} · <strong>Platform:</strong> {game.platform}
                    </p>
                    <p><a href={game.game_url} target="_blank" rel="noreferrer">Official site</a></p>
                </div>
            </div>
        </article>
    )
}
