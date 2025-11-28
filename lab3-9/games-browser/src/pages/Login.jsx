import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login">
      <h1>Login</h1>

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

        {error && <p className="authForm__error">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="authForm__submit"
        >
          {submitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="authForm__hint">
        Don&apos;t have an account?{' '}
        <Link to="/signup">Go to signup</Link>
      </p>
    </section>
  );
}
