import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import styles from '../assets/styles/LoginPage.module.css'

const LoginPage = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()  

  const handleSubmit = async (e) => {
    e.preventDefault()  
    setError('')        

    try {
      // This will later call your real backend API
      
      const response = await login(email, password)
      console.log('Login response:', response)
      // Redirect based on user type

    if (response.data.role === 'doctor') {
     navigate('/dashboard')
    }     
    else if (response.data.role === 'patient') {
       navigate('/dashboard')
      }
    }
    catch (err) {
  setError(err.message || 'Invalid email or password. Please try again.')
}

  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Logo/Title */}
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Login to your account</p>
        </div>

        {/* Error Message */}
        {error && <p className={styles.error}>{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>

          {/* Email Field */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className={styles.button}>
            LOGIN
          </button>

        </form>

        {/* Register Link - Only for Patients */}
        <p className={styles.registerText}>
          Are you a patient?{' '}
          <Link to="/register" className={styles.registerLink}>
            Create an account
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage