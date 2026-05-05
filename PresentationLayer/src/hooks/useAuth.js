import { useState } from 'react'

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', { // 🔁 change port if needed
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    console.log('Login response:', data)
    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Save to localStorage so user stays logged in on refresh
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.data.role)
    setIsAuthenticated(true)

    return data 
  }

 const register = async (name, email, password, dateofBirth, gender, phoneNumber, role) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        dateofBirth,   
        gender,        
        phoneNumber,
        role     
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return data
  }


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout, register } 
}

export default useAuth