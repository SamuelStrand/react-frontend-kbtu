import React, { useState } from 'react';
import GameCard from './GameCard';
import '../styles/gamesList.css';

export default function GamesList() {
    const [games, setGames] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const loadGames = async () => {
        setStatus('loading');
        setError(null);
        try {
            const res = await fetch('/ftg/games?platform=pc');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setGames(Array.isArray(data) ? data.slice(0, 12) : []);
            setStatus('done');
        } catch (e) {
            setError(e.message || 'Unknown error');
            setStatus('error');
        }
    };

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

            {status === 'error' && (
                <p className="gamesList__error">Failed to load games: {error}</p>
            )}

            <ul className="gamesList__grid" aria-live="polite">
                {games.map(game => (
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
