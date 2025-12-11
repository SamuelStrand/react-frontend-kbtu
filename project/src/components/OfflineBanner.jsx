import React from 'react'
import { useOfflineStatus } from '../hooks/useOfflineStatus'

export default function OfflineBanner() {
  const offline = useOfflineStatus()
  if (!offline) return null

  return (
    <div className="offlineBanner">
      You are offline. Cached data may be shown.
    </div>
  )
}
