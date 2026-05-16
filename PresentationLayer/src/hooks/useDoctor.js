// src/hooks/useDoctor.js
import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:5000/api";

export const useDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const getHeaders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage!");
      return null;
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, []);

  // 1. Fetch Dashboard Data (Stats, Appointments, Branches)
  const getDashboardData = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Fetch profile, appointments, and reviews concurrently
      const [profileRes, appointmentsRes, reviewsRes] = await Promise.all([
        fetch(`${BASE_URL}/auth/profile`, { method: "GET", headers }),
        fetch(`${BASE_URL}/appointments/doctor/appointments`, { method: "GET", headers }),
        fetch(`${BASE_URL}/doctors/reviews`, { method: "GET", headers }),
      ]);

      const profileData = await profileRes.json();
      const appointmentsData = await appointmentsRes.json();
      const reviewsData = await reviewsRes.json();

      if (!profileRes.ok || !appointmentsRes.ok || !reviewsRes.ok) {
        throw new Error(profileData.message || appointmentsData.message || reviewsData.message || "Failed to fetch dashboard data");
      }

      const doctorProfile = profileData.data || {};
      
      const dashboardData = {
        ...doctorProfile,
        shiftTiming: doctorProfile.StartShift && doctorProfile.EndShift 
          ? `${doctorProfile.StartShift} - ${doctorProfile.EndShift}` 
          : doctorProfile.shiftTiming || "Not Set",
        appointments: appointmentsData.data || [],
        reviews: reviewsData.data || [],
        branches: doctorProfile.branches || []
      };

      setDoctor(dashboardData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  // 2. Fetch Profile Data (Specific for the Profile Page)
  const getProfileData = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      const fetchedData = data.data ? data.data : data;
      setDoctor(fetchedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  // 3. Update Profile Data
  const updateProfile = async (updatedData) => {
    const headers = getHeaders();
    if (!headers) {
      setError("No token found. Please log in.");
      return { success: false };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      const fetchedData = data.data ? data.data : data;
      setDoctor(fetchedData); // Sync local state with updated data from server
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { 
    doctor, 
    loading, 
    error, 
    getDashboardData, 
    getProfileData, 
    updateProfile 
  };
};