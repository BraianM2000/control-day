// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/authService'
import type { JSX } from 'react'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
