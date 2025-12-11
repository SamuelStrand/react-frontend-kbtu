import React, { useCallback } from 'react'
import { useFavorites } from '../hooks/useFavorites'

export default function FavoriteButton({ gameId }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(gameId)

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      toggle(gameId)
    },
    [toggle, gameId]
  )

  return (
    <button
      className="favoriteBtn"
      aria-pressed={active}
      onClick={handleClick}
    >
      {active ? '★ Favorite' : '☆ Add to favorites'}
    </button>
  )
}
