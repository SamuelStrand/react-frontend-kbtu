import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice'

export function useFavorites() {
  const dispatch = useDispatch()
  const ids = useSelector(selectFavoriteIds)

  const isFavorite = useCallback(
    (id) => ids.includes(id),
    [ids],
  )

  const toggle = useCallback(
    (id) => {
      dispatch(toggleFavorite(id))
    },
    [dispatch],
  )

  const count = ids.length

  return useMemo(
    () => ({ ids, isFavorite, toggle, count }),
    [ids, isFavorite, toggle, count],
  )
}
