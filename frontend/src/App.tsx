import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Token from './types/Token'

import './App.css'

function App() {
  return (
    <Outlet />
  )
}

export default App
