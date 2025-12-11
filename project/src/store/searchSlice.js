import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  platform: 'pc',
  sort: 'alphabetical',
  category: 'all',
  page: 1,
  pageSize: 12,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
      state.page = 1
    },
    setPlatform(state, action) {
      state.platform = action.payload
      state.page = 1
    },
    setSort(state, action) {
      state.sort = action.payload
      state.page = 1
    },
    setCategory(state, action) {
      state.category = action.payload
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload
    },
    setPageSize(state, action) {
      state.pageSize = action.payload
      state.page = 1
    },
    setFromQuery(state, action) {
      return { ...state, ...action.payload }
    },
  },
})

export const {
  setSearch,
  setPlatform,
  setSort,
  setCategory,
  setPage,
  setPageSize,
  setFromQuery,
} = searchSlice.actions

export const selectSearchState = (state) => state.search

export default searchSlice.reducer
