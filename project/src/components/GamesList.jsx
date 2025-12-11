import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import GameCard from './GameCard'
import SearchBar from './SearchBar'
import '../styles/gamesList.css'
import { fetchGames } from '../services/apiService'
import {
  selectSearchState,
  setSearch,
  setPlatform,
  setSort,
  setCategory,
  setPage,
  setPageSize,
  setFromQuery,
} from '../store/searchSlice'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

export default function GamesList() {
  const dispatch = useDispatch()
  const searchState = useSelector(selectSearchState)
  const [searchParams, setSearchParams] = useSearchParams()

  const [games, setGames] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  // URL -> глобальный стейт (один раз)
  useEffect(() => {
    const platform = searchParams.get('platform') || searchState.platform
    const sort = searchParams.get('sort') || searchState.sort
    const category = searchParams.get('category') || searchState.category
    const search = searchParams.get('q') || searchState.search
    const page = Number(searchParams.get('page')) || searchState.page
    const pageSize = Number(searchParams.get('pageSize')) || searchState.pageSize
    dispatch(setFromQuery({ platform, sort, category, search, page, pageSize }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // глобальный стейт -> URL
  useEffect(() => {
    const params = {
      platform: searchState.platform,
      sort: searchState.sort,
      category: searchState.category,
      q: searchState.search || undefined,
      page: String(searchState.page),
      pageSize: String(searchState.pageSize),
    }
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) delete params[key]
    })
    setSearchParams(params, { replace: true })
  }, [
    searchState.platform,
    searchState.sort,
    searchState.category,
    searchState.search,
    searchState.page,
    searchState.pageSize,
    setSearchParams,
  ])

  const debouncedSearch = useDebouncedValue(searchState.search, 400)

  // network-first + "switch" логика через AbortController
  useEffect(() => {
    let ignore = false
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        const data = await fetchGames(
          {
            platform: searchState.platform,
            sort: searchState.sort,
            category: searchState.category,
          },
          controller.signal
        )
        if (ignore) return
        setGames(Array.isArray(data) ? data : [])
        setStatus('done')
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
  }, [searchState.platform, searchState.sort, searchState.category])

  const handleSearchChange = useCallback(
    (value) => {
      dispatch(setSearch(value))
    },
    [dispatch]
  )

  const handlePlatformChange = useCallback(
    (e) => dispatch(setPlatform(e.target.value)),
    [dispatch]
  )
  const handleSortChange = useCallback(
    (e) => dispatch(setSort(e.target.value)),
    [dispatch]
  )
  const handleCategoryChange = useCallback(
    (e) => dispatch(setCategory(e.target.value)),
    [dispatch]
  )
  const handlePageChange = useCallback(
    (newPage) => dispatch(setPage(newPage)),
    [dispatch]
  )
  const handlePageSizeChange = useCallback(
    (e) => dispatch(setPageSize(Number(e.target.value))),
    [dispatch]
  )

  const norm = useCallback((s) => (s ?? '').toLowerCase().trim(), [])

  const filtered = useMemo(() => {
    if (!debouncedSearch) return games
    const term = norm(debouncedSearch)
    return games.filter((g) => norm(g.title).includes(term))
  }, [games, debouncedSearch, norm])

  const totalPages = Math.max(1, Math.ceil(filtered.length / searchState.pageSize))
  const currentPage = Math.min(searchState.page, totalPages)
  const start = (currentPage - 1) * searchState.pageSize
  const pageItems = filtered.slice(start, start + searchState.pageSize)

  // если ушли за пределы страниц — поправить
  useEffect(() => {
    if (currentPage !== searchState.page) {
      dispatch(setPage(currentPage))
    }
  }, [currentPage, searchState.page, dispatch])

  return (
    <section className="gamesList">
      <div className="gamesList__toolbar">
        <div className="gamesList__filters">
          <select value={searchState.platform} onChange={handlePlatformChange}>
            <option value="pc">PC</option>
            <option value="browser">Browser</option>
            <option value="all">All</option>
          </select>

          <select value={searchState.category} onChange={handleCategoryChange}>
            <option value="all">All genres</option>
            <option value="shooter">Shooter</option>
            <option value="mmorpg">MMORPG</option>
            <option value="strategy">Strategy</option>
          </select>

          <select value={searchState.sort} onChange={handleSortChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="release-date">Release date</option>
            <option value="popularity">Popularity</option>
            <option value="relevance">Relevance</option>
          </select>

          <select value={searchState.pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <SearchBar
          value={searchState.search}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange('')}
          placeholder="Search by title…"
        />
      </div>

      {status === 'error' && <p className="gamesList__error">Error: {error}</p>}

      <ul className="gamesList__grid" aria-live="polite">
        {pageItems.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </ul>

      <div className="gamesList__pagination">
        <button
          className="gamesList__pageBtn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>

        <span className="gamesList__pageInfo">
          Page {currentPage} / {totalPages} · {filtered.length} items
        </span>

        <button
          className="gamesList__pageBtn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </section>
  )
}
