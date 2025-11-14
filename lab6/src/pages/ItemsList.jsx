import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as items from '../services/itemsService';
import Spinner from '../components/Spinner';
import ErrorBox from '../components/ErrorBox';
import ItemCard from '../components/ItemCard';
import '../styles/itemsList.css';

export default function ItemsList() {
  const [status, setStatus] = useState('loading'); // loading | done | error
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const [platform, setPlatform] = useState('pc');
  const [sort, setSort] = useState('alphabetical');

  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') ?? '';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatus('loading'); setError(null);
      try {
        const data = await items.getList({ platform, sort });
        if (!cancelled) { setList(data); setStatus('done'); }
      } catch (e) {
        if (!cancelled) { setError(e.message || 'Unknown error'); setStatus('error'); }
      }
    })();
    return () => { cancelled = true; };
  }, [platform, sort]);

  const norm = (s) => (s ?? '').toLowerCase().trim();
  const filtered = useMemo(
    () => list.filter(it => norm(it.title).includes(norm(q))),
    [list, q]
  );

  return (
    <section>
      <header className="itemsList__toolbar">
        <div className="itemsList__filters">
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
        </div>

        {/* Поиск связан с ?q= */}
        <div className="itemsList__search">
          <input
            type="text"
            value={q}
            onChange={e => {
              const v = e.target.value;
              if (v) setSp({ q: v }, { replace:true });
              else setSp({}, { replace:true });
            }}
            placeholder="Search by title…"
            className="itemsList__input"
          />
          <button
            className="itemsList__clearBtn"
            onClick={() => setSp({}, { replace:true })}
            disabled={!q}
          >
            Clear
          </button>
        </div>
      </header>

      {status === 'loading' && <Spinner />}
      {status === 'error' && <ErrorBox message={error} />}

      {status === 'done' && (
        <ul className="itemsList__grid" aria-live="polite">
          {filtered.map(item => <ItemCard key={item.id} item={item} />)}
        </ul>
      )}
    </section>
  );
}
