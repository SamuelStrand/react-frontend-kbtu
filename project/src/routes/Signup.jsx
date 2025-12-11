import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup, selectAuthStatus, selectAuthError } from '../store/authSlice'

function validatePassword(pw) {
  const lengthOk = pw.length >= 8
  const hasNumber = /\d/.test(pw)
  const hasSpecial = /[^A-Za-z0-9]/.test(pw)
  return {
    lengthOk,
    hasNumber,
    hasSpecial,
    valid: lengthOk && hasNumber && hasSpecial,
  }
}

export default function Signup() {
  const dispatch = useDispatch()
  const status = useSelector(selectAuthStatus)
  const serverError = useSelector(selectAuthError)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    const { valid } = validatePassword(password)
    if (!valid) {
      setLocalError('Password must be at least 8 characters and include a number and a special character.')
      return
    }
    if (password !== repeatPassword) {
      setLocalError('Passwords do not match.')
      return
    }
    const result = await dispatch(signup({ email, password }))
    if (signup.fulfilled.match(result)) {
      navigate('/')
    }
  }

  const rules = validatePassword(password)
  const loading = status === 'loading'

  return (
    <section className="authPage">
      <h1>Sign up</h1>
      <form className="authForm" onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Repeat password
          <input
            type="password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </label>

        <ul className="passwordHelp">
          <li className={rules.lengthOk ? 'ok' : ''}>At least 8 characters</li>
          <li className={rules.hasNumber ? 'ok' : ''}>Contains a number</li>
          <li className={rules.hasSpecial ? 'ok' : ''}>Contains a special character</li>
        </ul>

        {(localError || serverError) && (
          <p className="authError">{localError || serverError}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}
