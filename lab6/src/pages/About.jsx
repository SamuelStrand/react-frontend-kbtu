import React from 'react';

export default function About() {
  return (
    <section style={{display:'grid', gap:16}}>
      <header style={{display:'grid', gap:8}}>
        <h1 style={{margin:0}}>About this app</h1>
        <p style={{margin:0, color:'#555'}}>
          A small multi-page React app that browses free-to-play games using the FreeToGame API.
        </p>
      </header>

      <div style={{display:'grid', gap:12}}>
        <div style={{padding:16, border:'1px solid #eee', borderRadius:16}}>
          <h3 style={{margin:'0 0 8px'}}>Features</h3>
          <ul style={{margin:0, paddingLeft:18}}>
            <li>Browse and filter games (platform, sort), search by title</li>
            <li>Pagination on the list</li>
            <li>Detail page with badges and links</li>
            <li>Client-side routing (React Router)</li>
          </ul>
        </div>

        <div style={{padding:16, border:'1px solid #eee', borderRadius:16}}>
          <h3 style={{margin:'0 0 8px'}}>Tech stack</h3>
          <ul style={{margin:0, paddingLeft:18}}>
            <li>React + Vite</li>
            <li>react-router-dom</li>
            <li>Fetch API + hooks</li>
          </ul>
        </div>

        <div style={{padding:16, border:'1px solid #eee', borderRadius:16}}>
          <h3 style={{margin:'0 0 8px'}}>Data source</h3>
          <p style={{margin:0}}>
            Uses the FreeToGame API (free to use; attribution required).{' '}
            <a href="https://www.freetogame.com/api-doc" target="_blank" rel="noreferrer">
              API Docs
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
