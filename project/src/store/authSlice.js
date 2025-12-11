import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  loginWithEmailPassword,
  logout as logoutSrv,
  signupWithEmailPassword,
  subscribeToAuthChanges,
} from '../services/authService'

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }) => {
    const user = await signupWithEmailPassword(email, password)
    return { uid: user.uid, email: user.email, photoURL: user.photoURL ?? null }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const user = await loginWithEmailPassword(email, password)
    return { uid: user.uid, email: user.email, photoURL: user.photoURL ?? null }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutSrv()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.initialized = true
    },
    setPhotoURL(state, action) {
      if (state.user) state.user.photoURL = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { setUser, setPhotoURL } = authSlice.actions

export const initAuthListener = () => (dispatch) =>
  new Promise((resolve) => {
    subscribeToAuthChanges((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL ?? null,
          }),
        )
      } else {
        dispatch(setUser(null))
      }
      resolve()
    })
  })

export const selectUser = (state) => state.auth.user
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
