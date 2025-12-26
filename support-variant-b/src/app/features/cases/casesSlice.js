import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCases, fetchCaseById, patchCaseState } from "./casesService.js";

const defaultFilters = {
  state: "all", // open | in_progress | resolved |waiting_customer| all
  severity: "all", // low | medium | high |critical| all
  q: "", // search in title/description
};

const initialState = {
  items: [],
  totalItems: 0,
  totalPages: 1,
  page: 1,
  limit: 10,
  filters: { ...defaultFilters },
  listStatus: "idle", // idle | loading | succeeded | failed
  listError: null,
  currentCaseId: null,
  currentCase: null,
  detailsStatus: "idle", // idle | loading | succeeded | failed
  detailsError: null,

  logsByCaseId: {},
  updateStatus: "idle", // idle | loading | succeeded | failed
  updateError: null,
  isChangeOpen: false,
  nextState: "",
  nextComment: "",
};

export const loadCases = createAsyncThunk(
  "cases/loadCases",
  async (_, { getState, signal, rejectWithValue }) => {
    try {
      const s = getState().cases;

      const params = {
        page: String(s.page),
        limit: String(s.limit),
        state: s.filters.state,
        severity: s.filters.severity,
        q: s.filters.q,
      };

      if (!params.q) delete params.q;
      if (params.state === "all") delete params.state;
      if (params.severity === "all") delete params.severity;

      const data = await fetchCases(params, { signal }); // { items, page, totalPages, totalItems }
      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load cases");
    }
  },
);

export const loadCaseById = createAsyncThunk(
  "cases/loadCaseById",
  async (caseId, { rejectWithValue }) => {
    try {
      const item = await fetchCaseById(caseId);
      return item;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load case");
    }
  },
);

export const updateCaseState = createAsyncThunk(
  "cases/updateCaseState",
  async ({ caseId, state, comment }, { rejectWithValue }) => {
    try {
      const updated = await patchCaseState(caseId, state, comment);

      return { updated };
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update case");
    }
  },
);

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.page = 1;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    resetFilters(state) {
      state.filters = { ...defaultFilters };
      state.page = 1;
    },

    setCurrentCaseId(state, action) {
      state.currentCaseId = action.payload;
    },
    clearCurrentCase(state) {
      state.currentCaseId = null;
      state.currentCase = null;
      state.detailsStatus = "idle";
      state.detailsError = null;
    },
    openChangeStatus(state) {
      state.isChangeOpen = true;

      if (state.currentCase?.state) state.nextState = state.currentCase.state;
    },
    closeChangeStatus(state) {
      state.isChangeOpen = false;
    },
    setNextState(state, action) {
      state.nextState = action.payload;
    },
    setComment(state, action) {
      state.nextComment = action.payload;
    },
    resetChangeStatusUI(state) {
      state.isChangeOpen = false;
      state.nextState = state.currentCase?.state || "open";
      state.nextComment = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCases.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(loadCases.fulfilled, (state, action) => {
        state.listStatus = "succeeded";

        const { items, page, totalPages, totalItems } = action.payload || {};
        state.items = Array.isArray(items) ? items : [];

        state.totalItems = Number.isFinite(totalItems) ? totalItems : 0;
        state.totalPages = Number.isFinite(totalPages) ? totalPages : 1;
        state.page = Number.isFinite(page) ? page : state.page;
      })
      .addCase(loadCases.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError =
          action.payload || action.error?.message || "Failed to load cases";
      })

      .addCase(loadCaseById.pending, (state) => {
        state.detailsStatus = "loading";
        state.detailsError = null;
      })
      .addCase(loadCaseById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.currentCase = action.payload || null;

        if (action.payload?.id) {
          state.currentCaseId = action.payload.id;
        }
      })
      .addCase(loadCaseById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError =
          action.payload || action.error?.message || "Failed to load case";
      });
  },
});

export const {
  setPage,
  setLimit,
  setFilters,
  resetFilters,
  setCurrentCaseId,
  clearCurrentCase,
  openChangeStatus,
  closeChangeStatus,
  setNextState,
  setComment,
  resetChangeStatusUI,
} = casesSlice.actions;

export default casesSlice.reducer;

/**
 * Selectors
 */
export const selectCases = (state) => state.cases.items;
export const selectCasesStatus = (state) => state.cases.listStatus;
export const selectCasesError = (state) => state.cases.listError;

export const selectCasesPagination = (state) => ({
  page: state.cases.page,
  limit: state.cases.limit,
  totalPages: state.cases.totalPages,
  totalItems: state.cases.totalItems,
});

export const selectCasesFilters = (state) => state.cases.filters;

export const selectCurrentCaseId = (state) => state.cases.currentCaseId;
export const selectCurrentCase = (state) => state.cases.currentCase;
export const selectCaseDetailsStatus = (state) => state.cases.detailsStatus;
export const selectCaseDetailsError = (state) => state.cases.detailsError;

export const selectUpdateStatus = (state) => state.cases.updateStatus;
export const selectUpdateError = (state) => state.cases.updateError;

export const selectChangeUIIsChangeOpen = (state) => state.cases.isChangeOpen;
export const selectChangeUINextState = (state) => state.cases.nextState;
export const selectChangeUIComment = (state) => state.cases.nextComment;
