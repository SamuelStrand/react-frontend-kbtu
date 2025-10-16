import React, { useState } from 'react';
import GameCard from './GameCard';
import '../styles/gamesList.css';

export default function GamesList() {
    const [games, setGames] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');

    const loadGames = async () => {
        setStatus('loading');
        setError(null);
        try {
            const res = await fetch('/ftg/games?platform=pc');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setGames(Array.isArray(data) ? data.slice(0, 999) : []);
            setStatus('done');
        } catch (e) {
            setError(e.message || 'Unknown error');
            setStatus('error');
        }
    };

    const norm = s => s.toLowerCase();
    const filtered = games.filter(g =>
        norm(g.title).includes(norm(query.trim()))
    );

    return (
        <section className="gamesList">
            <header className="gamesList__header">
                <h2>Free PC Games</h2>
                <button
                    className="gamesList__loadBtn"
                    onClick={loadGames}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Loading…' : 'Load games'}
                </button>
            </header>

            <div className="gamesList__search">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by title…"
                    className="gamesList__input"
                />
                <button
                    className="gamesList__clearBtn"
                    onClick={() => setQuery('')}
                    disabled={!query}
                    aria-label="Clear search"
                >
                    Clear
                </button>
            </div>

            {status === 'error' && (
                <p className="gamesList__error">Failed to load games: {error}</p>
            )}

            <ul className="gamesList__grid" aria-live="polite">
                {(query ? filtered : games).map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </ul>

            <footer className="gamesList__foot">
                <small>
                    Data: <a href="https://www.freetogame.com/api-doc" target="_blank" rel="noreferrer">FreeToGame API</a>
                </small>
            </footer>
        </section>
    );
}
