import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getById } from '../../services/itemsService';

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query, { rejectWithValue, signal }) => {
    try {
      const data = await getAll({ search: query, signal });
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load items');
    }
  },
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue, signal }) => {
    try {
      const data = await getById(id, { signal });
      return data ?? null;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load item');
    }
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.loadingList = true;
        state.errorList = null;
        state.query = action.meta.arg || '';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload || [];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList =
          action.payload || action.error.message || 'Failed to load items';
      });

    builder
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem =
          action.payload || action.error.message || 'Failed to load item';
        state.selectedItem = null;
      });
  },
});

export const { setQuery, clearSelectedItem } = itemsSlice.actions;

export default itemsSlice.reducer;
