import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './RootLayout.css';

export default function RootLayout() {
    return (
        <div className="layout">
            <NavBar />
            <main className="layout__main">
                <Outlet />
            </main>
            <footer className="layout__footer">
                <small>© {new Date().getFullYear()} Game Explorer.</small>
            </footer>
        </div>
    );
}
