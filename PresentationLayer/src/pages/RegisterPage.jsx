import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import styles from "../assets/styles/RegisterPage.module.css";

const RegisterPage = () => {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',      
    email: '',
    gender: '',
    dateofBirth: '', 
    role: '',     
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')  

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.dateofBirth,
        formData.gender,
        formData.phoneNumber,
        formData.role
      )
      setSuccess('Account created successfully! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2000)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Register as a new patient</p>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Name */}
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
         <div className={styles.inputGroup}>
           <label>Phone Number</label>
           <input
             type="tel"
             name="phoneNumber"         
             placeholder="Enter your phone number"
             value={formData.phoneNumber}  
             onChange={handleChange}
             required
            />
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Date of Birth */}
          <div className={styles.inputGroup}>
           <label>Date of Birth</label>
            <input
            type="date"
            name="dateofBirth"
            value={formData.dateofBirth}
            onChange={handleChange}
            required
           />
         </div>

          {/* Gender Dropdown */}
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Role Dropdown — add this inside the form */}
          <div className={styles.inputGroup}>
           <label>Role</label>
            <select
             name="role"
             value={formData.role}
             onChange={handleChange}
             className={styles.select}
             required
             >
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
           </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            REGISTER
          </button>

        </form>

        <p className={styles.loginText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.loginLink}>
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage