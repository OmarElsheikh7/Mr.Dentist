import { useState } from 'react'

function useAuth() {
{/*replace this with real auth logic (JWT token check, etc.)*/}
const [isAuthenticated, setIsAuthenticated] = useState(false)

const login = () => setIsAuthenticated(true)
const logout = () => setIsAuthenticated(false)

return { isAuthenticated, login, logout }
}

export default useAuth