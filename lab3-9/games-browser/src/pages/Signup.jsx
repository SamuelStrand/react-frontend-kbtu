import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);

    try {
      await signup(email, password);
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login">
      <h1>Signup</h1>

      <form className="authForm" onSubmit={handleSubmit}>
        <label className="authForm__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="authForm__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="authForm__field">
          <span>Confirm password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>

        {error && <p className="authForm__error">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="authForm__submit"
        >
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="authForm__hint">
        Already have an account?{' '}
        <Link to="/login">Go to login</Link>
      </p>
    </section>
  );
}
