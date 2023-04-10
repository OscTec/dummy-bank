import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

import Dashboard from './pages/Dashboard'
import Token from './types/Token'

import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [user, setUser] = useState<Token | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode<Token>(token)
      console.log(decodedToken)
      setUser(decodedToken)
    }
  }, [])

  return (
    <Outlet />
  )
}

export default App
