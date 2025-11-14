import React from 'react';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div style={{display:'flex', gap:8, alignItems:'center', padding:'12px 0'}}>
      <div style={{
        width:16, height:16, border:'2px solid #ddd', borderTopColor:'#111',
        borderRadius:'50%', animation:'spin 1s linear infinite'
      }} />
      <span>{label}</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
