import { useState, useEffect } from 'react'

function useReviews() {

  const [completedAppointments, setCompletedAppointments] = useState([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const [appointmentsError, setAppointmentsError] = useState(null)

  // ── Fetch completed appointments on mount ──
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token') // same as your useAuth pattern

        const response = await fetch('http://localhost:5000/api/reviews?status=completed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // send token so backend knows who you are
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load appointments')
        }

        setCompletedAppointments(data.data) // adjust to just `data` if your backend doesn't wrap in { data: [] }

      } catch (err) {
        setAppointmentsError(err.message)
      } finally {
        setLoadingAppointments(false)
      }
    }

    fetchAppointments()
  }, [])

  
  const submitReview = async (doctorId, reviewData) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:5000/api/reviews/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData), // { rating, comment }
    })

    const text = await response.text()
console.log(text)

if (!response.ok) {
  throw new Error(data.message || 'Failed to submit review') // 'data' doesn't exist here!
}
    return data 
  }

  return {
    completedAppointments,
    loadingAppointments,
    appointmentsError,
    submitReview,
  }
}

export default useReviews