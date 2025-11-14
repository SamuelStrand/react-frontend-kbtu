const BASE = '/ftg';

export async function getList({ platform='pc', sort='alphabetical' } = {}) {
  const url = `${BASE}/games?platform=${encodeURIComponent(platform)}&sort-by=${encodeURIComponent(sort)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getById(id) {
  const url = `${BASE}/game?id=${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
