import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import favoritesReducer from './favoritesSlice'
import searchReducer from './searchSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
})

export default store
