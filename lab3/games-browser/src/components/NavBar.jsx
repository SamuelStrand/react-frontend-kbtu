import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="navBar">
      <NavLink to="/" className="navBar__brand" end>
        Game Explorer
      </NavLink>

      <ul className="navBar__links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navBar__link${isActive ? ' navBar__link--active' : ''}`
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navBar__link${isActive ? ' navBar__link--active' : ''}`
            }
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              `navBar__link${isActive ? ' navBar__link--active' : ''}`
            }
          >
            Games
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `navBar__link${isActive ? ' navBar__link--active' : ''}`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `navBar__link${isActive ? ' navBar__link--active' : ''}`
                }
              >
                Signup
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `navBar__link${isActive ? ' navBar__link--active' : ''}`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                className="navBar__link navBar__link--button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
