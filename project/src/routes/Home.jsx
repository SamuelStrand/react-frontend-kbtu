import React from 'react'
import GamesList from '../components/GamesList'

export default function Home() {
    return (
        <>
            <h1 style={{margin:'0 0 12px'}}>FreeToGame — Catalog</h1>
            <p style={{margin:'0 0 16px', color:'#555'}}>Browse free PC/Browser games. Use filters and search by title.</p>
            <GamesList />
        </>
    )
}
