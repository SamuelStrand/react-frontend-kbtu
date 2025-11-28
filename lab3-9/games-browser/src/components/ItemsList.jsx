import React, { useEffect, useMemo, useState } from 'react';
import ItemCard from './ItemCard';
import Spinner from './Spinner';
import ErrorBox from './ErrorBox';
import { getAll as fetchItems } from '../services/itemsService';
import './ItemsList.css';

export default function ItemsList({ query = '', onQueryChange }) {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setStatus('loading');
            setError(null);
            try {
                const data = await fetchItems({ signal: controller.signal });
                setItems(data);
                setStatus('success');
            } catch (err) {
                if (err.name === 'AbortError') {
                    return;
                }
                setError(err.message || 'Unknown error');
                setStatus('error');
            }
        }

        load();

        return () => controller.abort();
    }, [reloadToken]);

    const normalizedQuery = query.trim().toLowerCase();

    const filteredItems = useMemo(() => {
        if (!normalizedQuery) {
            return items;
        }

        return items.filter(item =>
            item.title?.toLowerCase().includes(normalizedQuery)
        );
    }, [items, normalizedQuery]);

    const handleInputChange = event => {
        onQueryChange?.(event.target.value);
    };

    const handleClear = () => {
        onQueryChange?.('');
    };

    return (
        <section className="itemsList">
            <header className="itemsList__header">
                <div>
                    <h2 className="itemsList__title">Free PC Games</h2>
                    <p className="itemsList__subtitle">
                        Browse the FreeToGame catalog and open a game to learn more details.
                    </p>
                </div>
                <button
                    type="button"
                    className="itemsList__reload"
                    onClick={() => setReloadToken(token => token + 1)}
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Loading…' : 'Reload'}
                </button>
            </header>

            <div className="itemsList__search">
                <label className="itemsList__label" htmlFor="items-search">
                    Search by title
                </label>
                <input
                    id="items-search"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a game…"
                    className="itemsList__input"
                />
                <button
                    type="button"
                    className="itemsList__clear"
                    onClick={handleClear}
                    disabled={!query}
                >
                    Clear
                </button>
            </div>

            {status === 'loading' && !items.length && (
                <div className="itemsList__state">
                    <Spinner label="Loading games" />
                </div>
            )}

            {status === 'error' && (
                <ErrorBox>
                    Failed to load games: {error}
                </ErrorBox>
            )}

            {status === 'success' && !filteredItems.length && (
                <p className="itemsList__empty">No games found for “{query}”.</p>
            )}

            <ul className="itemsList__grid" aria-live="polite">
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </ul>

            <footer className="itemsList__footer">
                <small>
                    Data source:{' '}
                    <a
                        href="https://www.freetogame.com/api-doc"
                        target="_blank"
                        rel="noreferrer"
                    >
                        FreeToGame API
                    </a>
                </small>
            </footer>
        </section>
    );
}
