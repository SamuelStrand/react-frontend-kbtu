import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectUser } from '../store/authSlice'

export default function ProtectedRoute() {
  const user = useSelector(selectUser)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
