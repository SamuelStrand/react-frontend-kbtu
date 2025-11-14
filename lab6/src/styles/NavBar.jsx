import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    [
      'navbar__link',
      isActive ? 'navbar__link--active' : null,
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <header className="navbar">
      <div className="navbar__brand">Free Games</div>
      <nav className="navbar__links">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/items" className={linkClass}>
          Items
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </nav>
      <div className="navbar__spacer" />
      <NavLink to="/login" className="navbar__login">
        Login
      </NavLink>
    </header>
  );
}
