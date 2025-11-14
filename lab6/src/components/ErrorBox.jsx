import React from 'react';

export default function ErrorBox({ message = 'Something went wrong' }) {
  return (
    <div style={{
      padding:'10px 12px', border:'1px solid #f3c3c6', background:'#fff5f6',
      color:'#b00020', borderRadius:10
    }}>
      {message}
    </div>
  );
}
