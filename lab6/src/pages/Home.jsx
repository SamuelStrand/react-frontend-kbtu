import React from 'react';

export default function Home() {
  return (
    <section style={{display:'grid', gap:16}}>
      <header>
        <h1 className="page-title">Free Games Explorer</h1>
        <p className="page-sub">
          Browse free-to-play games, filter by platform and sort order, search by title, and view detailed info.
        </p>
      </header>

      <div style={{
        display:'grid', gridTemplateColumns:'minmax(260px, 400px) 1fr', gap:16, alignItems:'center'
      }}>
        <img
          src="https://images.pexels.com/photos/3945673/pexels-photo-3945673.jpeg"
          alt="Games"
          style={{width:'100%', borderRadius:16}}
        />
        <ul style={{margin:0, paddingLeft:18, color:'#333'}}>
          <li>Fast search with client-side filtering</li>
          <li>List & Details with robust loading/error states</li>
          <li>Clean routing across 5 pages</li>
        </ul>
      </div>
    </section>
  );
}
