import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/items', label: 'Games' },
    { to: '/login', label: 'Login' },
];

export default function NavBar() {
    return (
        <nav className="navBar">
            <NavLink to="/" className="navBar__brand" end>
                Game Explorer
            </NavLink>
            <ul className="navBar__links">
                {links.map(link => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `navBar__link${isActive ? ' navBar__link--active' : ''}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
