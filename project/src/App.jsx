import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './routes/Home.jsx'
import GameDetails from './routes/GameDetails.jsx'
import About from './routes/About.jsx'

export default function App() {
    return (
        <>
            <nav className="navbar">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>

            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    )
}
