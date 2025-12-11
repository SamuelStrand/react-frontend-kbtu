import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLocalFavorites,
  saveLocalFavorites,
  getServerFavorites,
  saveServerFavorites,
  mergeLocalAndServer,
} from '../services/favoritesService'

const initialState = {
  ids: [],
  status: 'idle',
  error: null,
  mergeMessage: '',
}

export const loadFavorites = createAsyncThunk(
  'favorites/load',
  async (_, { getState }) => {
    const user = getState().auth.user
    if (user) {
      const ids = await getServerFavorites(user.uid)
      return { ids, from: 'server' }
    }
    const ids = getLocalFavorites()
    return { ids, from: 'local' }
  },
)

export const toggleFavorite = createAsyncThunk(
  'favorites/toggle',
  async (gameId, { getState }) => {
    const user = getState().auth.user
    let ids
    if (user) {
      const current = await getServerFavorites(user.uid)
      ids = current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId]
      await saveServerFavorites(user.uid, ids)
    } else {
      const current = getLocalFavorites()
      ids = current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId]
      saveLocalFavorites(ids)
    }
    return ids
  },
)

export const mergeFavoritesOnLogin = createAsyncThunk(
  'favorites/mergeOnLogin',
  async (_, { getState }) => {
    const user = getState().auth.user
    if (!user) return []
    const merged = await mergeLocalAndServer(user.uid)
    return merged
  },
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.ids = action.payload.ids
        state.status = 'ready'
        state.error = null
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.ids = action.payload
      })
      .addCase(mergeFavoritesOnLogin.fulfilled, (state, action) => {
        state.ids = action.payload
        state.mergeMessage =
          'Your local favorites were merged with your account.'
      })
  },
})

export const selectFavoriteIds = (state) => state.favorites.ids
export const selectMergeMessage = (state) => state.favorites.mergeMessage

export default favoritesSlice.reducer
