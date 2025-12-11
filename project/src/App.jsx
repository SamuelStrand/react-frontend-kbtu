import React, { useEffect } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from './routes/Home.jsx'
import GameDetails from './routes/GameDetails.jsx'
import About from './routes/About.jsx'
import Login from './routes/Login.jsx'
import Signup from './routes/Signup.jsx'
import Favorites from './routes/Favorites.jsx'
import Profile from './routes/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import { initAuthListener, logout, selectUser } from './store/authSlice'
import { loadFavorites, mergeFavoritesOnLogin, selectMergeMessage } from './store/favoritesSlice'

export default function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const mergeMessage = useSelector(selectMergeMessage)

  useEffect(() => {
    dispatch(initAuthListener())
    dispatch(loadFavorites())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(mergeFavoritesOnLogin())
    }
  }, [user, dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <OfflineBanner />

      <nav className="navbar">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/about">About</NavLink>
        {user && <NavLink to="/profile">Profile</NavLink>}

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {user ? (
            <>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  style={{ width: 32, height: 32, borderRadius: '50%' }}
                />
              )}
              <span style={{ fontSize: 14 }}>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign up</NavLink>
            </>
          )}
        </div>
      </nav>

      {mergeMessage && <div className="infoBanner">{mergeMessage}</div>}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
