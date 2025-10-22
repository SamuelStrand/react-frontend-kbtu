import React from 'react'

export default function SearchBar({ value, onChange, onClear, placeholder='Search...' }) {
    return (
        <div style={{display:'flex', gap:8, margin:'8px 0 16px'}}>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                style={{flex:1, padding:'10px 12px', border:'1px solid #ddd', borderRadius:10}}
            />
            <button onClick={onClear} disabled={!value}
                    style={{padding:'10px 14px', border:'1px solid #ddd', borderRadius:10, background:'#f6f6f6'}}>
                Clear
            </button>
        </div>
    )
}
