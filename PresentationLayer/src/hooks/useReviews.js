import { useState, useEffect } from 'react';

function useReviews() {
  const [bookedDoctors, setBookedDoctors] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/appointments/patient/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load appointments');
        }

        // Extracting your 3 working appointments
        const allAppointments = data.data || data || [];
        
        // Deduplicate the list so each doctor appears only once in the dropdown
        const uniqueDoctors = [];
        const seenDoctorIds = new Set();

        allAppointments.forEach(appt => {
          // Fallback options to securely match whatever naming standard your backend uses
          const doc = appt.doctor || appt.doctorId;
          if (doc) {
            const docId = doc._id || doc.id;
            if (docId && !seenDoctorIds.has(docId)) {
              seenDoctorIds.add(docId);
              uniqueDoctors.push(doc); // Keeps the doctor object details
            }
          }
        });

        setBookedDoctors(uniqueDoctors);
      } catch (err) {
        setAppointmentsError(err.message);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // Submit review directly to: http://localhost:5000/api/reviews/${doctorId}
  const submitReview = async (doctorId, reviewData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:5000/api/reviews/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData), 
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit review');
    }
    return data;
  };

  return {
    bookedDoctors,
    loadingAppointments,
    appointmentsError,
    submitReview,
  };
}

export default useReviews;