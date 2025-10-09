import React from 'react';
import GamesList from './components/GamesList';

export default function App() {
    return (
        <main style={{ padding: '1rem' }}>
            <h1>Games Browser</h1>
            <GamesList />
        </main>
    );
}
