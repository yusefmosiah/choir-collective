'use client'
import DashboardFeature from '@/components/dashboard/dashboard-feature'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function Page() {
  const handleClick = async () => {
    try {
      console.log('Calling API at:', API_URL)  // Add logging
      const response = await fetch(`${API_URL}/api/log-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log('Response:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <DashboardFeature />
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Test Backend
      </button>
    </div>
  )
}
