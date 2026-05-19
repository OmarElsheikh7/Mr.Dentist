// src/hooks/useDoctor.js
import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:5000/api";

export const useDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);

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

  // 1. Fetch Dashboard Data
  const getDashboardData = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) { setError("No token found. Please log in."); return; }

    setLoading(true);
    setError(null);
    try {
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
      setDoctor({
        ...doctorProfile,
        shiftTiming: doctorProfile.StartShift && doctorProfile.EndShift
          ? `${doctorProfile.StartShift} - ${doctorProfile.EndShift}`
          : doctorProfile.shiftTiming || "Not Set",
        appointments: appointmentsData.data || [],
        reviews: reviewsData.data || [],
        branches: doctorProfile.branches || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  // 2. Fetch Profile Data
  const getProfileData = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) { setError("No token found. Please log in."); return; }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, { method: "GET", headers });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
      setDoctor(data.data ? data.data : data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  // 3. Update Profile Data
  const updateProfile = async (updatedData) => {
    const headers = getHeaders();
    if (!headers) { setError("No token found. Please log in."); return { success: false }; }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      setDoctor(data.data ? data.data : data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // 4. Upload Profile Picture — same endpoint as patient
  const uploadProfilePicture = async (file) => {
    const token = localStorage.getItem("token");
    if (!token) { setError("No token found. Please log in."); return { success: false }; }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch(`${BASE_URL}/auth/profile/upload-picture`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }, // NO Content-Type — browser sets multipart boundary
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      // Sync pictureUrl into local doctor state so the avatar updates immediately
      setDoctor((prev) => prev ? { ...prev, pictureUrl: data.pictureUrl } : prev);
      return { success: true, pictureUrl: data.pictureUrl };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getAllDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/doctors`, { method: "GET" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch doctors");
      setDoctorsList(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllBranches = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) { setError("No token found. Please log in."); return; }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/clinic-branches`, { method: "GET", headers });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch branches");
      setBranchesList(data.data || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getHeaders]);

  return {
    doctor,
    doctorsList,
    branchesList,
    loading,
    error,
    getDashboardData,
    getProfileData,
    updateProfile,
    uploadProfilePicture, // ← new
    getAllDoctors,
    getAllBranches,
  };
};