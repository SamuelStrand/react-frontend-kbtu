import React from 'react';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <section className="login">
      <h1>Profile</h1>

      <div className="profileCard">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>UID:</strong> {user.uid}
        </p>
      </div>
    </section>
  );
}
