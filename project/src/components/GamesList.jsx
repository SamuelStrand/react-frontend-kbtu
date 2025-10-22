import React, { useState } from 'react'
import GameCard from './GameCard'
import SearchBar from './SearchBar'
import '../styles/gamesList.css'

export default function GamesList() {
    const [games, setGames] = useState([])
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')
    const [platform, setPlatform] = useState('pc')
    const [sort, setSort] = useState('alphabetical')

    const loadGames = async () => {
        setStatus('loading'); setError(null)
        try {
            const url = `/ftg/games?platform=${encodeURIComponent(platform)}&sort-by=${encodeURIComponent(sort)}`
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            setGames(Array.isArray(data) ? data : [])
            setStatus('done')
        } catch (e) {
            setError(e.message || 'Unknown error')
            setStatus('error')
        }
    }

    const norm = s => (s ?? '').toLowerCase().trim()
    const filtered = games.filter(g => norm(g.title).includes(norm(query)))

    return (
        <section className="gamesList">
            <div className="gamesList__toolbar">
                <div className="gamesList__filters">
                    <select value={platform} onChange={e => setPlatform(e.target.value)}>
                        <option value="pc">PC</option>
                        <option value="browser">Browser</option>
                        <option value="all">All</option>
                    </select>
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="release-date">Release date</option>
                        <option value="popularity">Popularity</option>
                        <option value="relevance">Relevance</option>
                    </select>
                    <button onClick={loadGames} disabled={status==='loading'}>
                        {status==='loading' ? 'Loading…' : 'Load'}
                    </button>
                </div>

                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onClear={() => setQuery('')}
                    placeholder="Search by title…"
                />
            </div>

            {status==='error' && <p className="gamesList__error">Error: {error}</p>}

            <ul className="gamesList__grid" aria-live="polite">
                {(query ? filtered : games).map(g => <GameCard key={g.id} game={g} />)}
            </ul>
        </section>
    )
}
