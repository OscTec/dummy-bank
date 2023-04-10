import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Token from './types/Token'

import './App.css'

function App() {
  const [user, setUser] = useState<Token | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode<Token>(token)
      setUser(decodedToken)
    }
  }, [])

  return (
    <Outlet />
  )
}

export default App
