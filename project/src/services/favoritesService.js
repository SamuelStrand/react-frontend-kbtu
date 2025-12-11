import { db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const LOCAL_KEY = 'ftg_favorites'

export function getLocalFavorites() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveLocalFavorites(ids) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(ids))
}

export async function getServerFavorites(uid) {
  const ref = doc(db, 'favorites', uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return []
  const data = snap.data()
  return Array.isArray(data.ids) ? data.ids : []
}

export async function saveServerFavorites(uid, ids) {
  const ref = doc(db, 'favorites', uid)
  await setDoc(ref, { ids }, { merge: true })
}

export async function mergeLocalAndServer(uid) {
  const local = getLocalFavorites()
  const server = await getServerFavorites(uid)
  const merged = Array.from(new Set([...server, ...local]))
  await saveServerFavorites(uid, merged)
  saveLocalFavorites([])
  return merged
}
