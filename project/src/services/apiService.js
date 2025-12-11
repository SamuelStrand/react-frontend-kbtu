const BASE_URL = import.meta.env.VITE_FTG_BASE_URL || '/ftg'

export async function fetchGames(
  { platform = 'pc', sort = 'alphabetical', category = 'all' } = {},
  signal,
) {
  const params = new URLSearchParams()

  if (platform && platform !== 'all') params.set('platform', platform)
  if (sort) params.set('sort-by', sort)
  if (category && category !== 'all') params.set('category', category)

  const res = await fetch(`${BASE_URL}/games?${params.toString()}`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchGameDetails(id, signal) {
  const res = await fetch(`${BASE_URL}/game?id=${encodeURIComponent(id)}`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
