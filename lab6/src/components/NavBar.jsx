import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkStyle = ({ isActive }) => ({
    padding:'6px 10px',
    borderRadius:8,
    textDecoration:'none',
    color: isActive ? '#fff' : '#111',
    background: isActive ? '#111' : 'transparent'
  });

  return (
    <nav className="navbar">
      <NavLink to="/" end style={linkStyle}>Home</NavLink>
      <NavLink to="/items" style={linkStyle}>Items</NavLink>
      <NavLink to="/about" style={linkStyle}>About</NavLink>
      <NavLink to="/login" style={linkStyle}>Login</NavLink>
    </nav>
  );
}
