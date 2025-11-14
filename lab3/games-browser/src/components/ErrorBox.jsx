import React from 'react';
import './ErrorBox.css';

export default function ErrorBox({ children }) {
    return (
        <div className="errorBox" role="alert">
            {children}
        </div>
    );
}
