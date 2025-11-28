import React from 'react';
import './Spinner.css';

export default function Spinner({ label = 'Loading' }) {
    return (
        <div className="spinner" role="status" aria-live="polite" aria-label={label}>
            <div className="spinner__circle" />
            <span className="spinner__label">{label}…</span>
        </div>
    );
}
