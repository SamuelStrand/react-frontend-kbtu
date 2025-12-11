import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setPhotoURL } from '../store/authSlice'
import { uploadProfileImage } from '../services/profileService'

export default function Profile() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const workerRef = useRef(null)

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/imageWorker.js', import.meta.url),
      { type: 'module' }
    )
    return () => workerRef.current?.terminate()
  }, [])

  if (!user) {
    return <p>You must be logged in to see your profile.</p>
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!/image\/(jpeg|png)/.test(file.type)) {
      setError('Only JPG and PNG are allowed.')
      return
    }
    setError('')
    setUploading(true)
    setMessage('')

    workerRef.current.onmessage = async (event) => {
      const { ok, blob, error: workerError } = event.data
      if (!ok) {
        setError(workerError || 'Failed to process image.')
        setUploading(false)
        return
      }
      try {
        const compressedFile = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
        const url = await uploadProfileImage(user.uid, compressedFile)
        dispatch(setPhotoURL(url))
        setMessage('Profile picture updated.')
      } catch (err) {
        setError(err.message || 'Upload failed.')
      } finally {
        setUploading(false)
      }
    }

    workerRef.current.postMessage(file)
  }

  return (
    <section className="profilePage">
      <h1>Profile</h1>

      <div className="profileCard">
        {user.photoURL && (
          <img src={user.photoURL} alt="Profile" className="profileAvatar" />
        )}
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <label className="uploadLabel">
          Upload profile picture
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </label>

        {uploading && <p>Uploading…</p>}
        {error && <p className="authError">{error}</p>}
        {message && <p className="successMsg">{message}</p>}
      </div>
    </section>
  )
}
